import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
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

const Products = () => {
  const productContext = useContext(ProductContext);
  const [data, setData] = useState<ProductType[] | null>();

  const getProducts = async () => {
    const { data } = await axios.get("https://fakestoreapi.com/products");

    productContext?.setProducts(data);
    setData(data);
    return data;
  };

  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    // getProducts();

    if (
      productContext?.filteredData != null &&
      productContext.filteredData != undefined &&
      productContext.filteredData?.length != 0
    )
      setData(productContext.filteredData);
    else setData(productContext?.products);
  }, [productContext?.filteredData]);
  return (
    <div className="products-wrapper">
      <div className="products">
        {/* {productContext?.isFiltering == false ? (
          <h2>No data Found Of This Category and Price</h2>
        ) : (
          data?.map((prod) => (
            <div key={prod.id} className="product">
              <img src={prod.image} width={"100%"} height={"65%"} />
              <p style={{ fontWeight: "bold" }}>
                {prod.title.length > 25
                  ? prod.title.slice(0, 24) + "..."
                  : prod.title}
              </p>
              <h4 style={{ color:  "blue" }}>$ {prod.price}</h4>
            </div>
          ))
        )} */}

        {data?.map((prod, i) => (
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
};

export default Products;
