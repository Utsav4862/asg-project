import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ProductContext, ProductState } from "../Context/ProductsProvider";

export type ProductType = {
  id: string;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

function Products() {
  const productContext = useContext(ProductContext);

  const getProducts = async () => {
    const { data } = await axios.get("https://fakestoreapi.com/products");

    productContext?.setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);
  return (
    <div className="products-wrapper">
      <div className="products">
        {productContext?.products?.map((prod) => (
          <div key={prod.id} className="product">
            <img src={prod.image} width={"100%"} height={"65%"} />
            <p style={{ fontWeight: "bold" }}>
              {prod.title.length > 25
                ? prod.title.slice(0, 24) + "..."
                : prod.title}
            </p>
            <h4 style={{ color: "blue" }}>$ {prod.price}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
