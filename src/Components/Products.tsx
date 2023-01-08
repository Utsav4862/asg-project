import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ProductContext, ProductState } from "../Context/ProductsProvider";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
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
  isLiked: boolean;
  isHover: boolean;
};

const Products = () => {
  const productContext = useContext(ProductContext);
  const [data, setData] = useState<ProductType[] | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const getProducts = async () => {
    setIsLoading(true);
    const { data } = await axios.get("https://fakestoreapi.com/products");
    for (let p of data) {
      p.isLiked = false;
      p.isHover = false;
    }
    productContext?.setProducts(data);
    setData(data);
    setIsLoading(false);
  };

  const likeUnlike = (value: string, prod: ProductType, i: number) => {
    let temp = [...data!];
    if (value == "like") {
      temp[i].isLiked = true;
    } else temp[i].isLiked = false;

    setData(temp);
  };

  const onProductHover = (value: string, i: number) => {
    let temp = [...data!];
    if (value == "hover") {
      temp[i].isHover = true;
    } else temp[i].isHover = false;

    setData(temp);
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
        {isLoading ? (
          <h4>Loading...</h4>
        ) : (
          data?.map((prod, i) => (
            <div
              key={prod.id}
              className="product"
              onMouseEnter={() => {
                onProductHover("hover", i);
              }}
              onMouseLeave={() => {
                onProductHover("hover-out", i);
              }}
            >
              <img src={prod.image} width={"100%"} height={"65%"} />
              {prod.isLiked ? (
                <AiFillHeart
                  size={25}
                  color="red"
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    cursor: "pointer",
                  }}
                  onClick={() => likeUnlike("unlike", prod, i)}
                />
              ) : (
                <AiOutlineHeart
                  size={25}
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    cursor: "pointer",
                  }}
                  onClick={() => likeUnlike("like", prod, i)}
                />
              )}
              {prod.isHover == true ? (
                <div
                  style={{
                    width: "100%",
                    textAlign: "center",
                    height: 30,
                    backgroundColor: "blue",
                    opacity: 0.5,
                    position: "absolute",
                    bottom: 100,
                    right: 0,
                  }}
                >
                  <h3 style={{ color: "#fff" }}>View Product</h3>
                </div>
              ) : (
                ""
              )}
              <div style={{ marginTop: 10 }}>
                <p style={{ fontWeight: "bold" }}>
                  {prod.title.length > 25
                    ? prod.title.slice(0, 24) + "..."
                    : prod.title}
                </p>
                <h4 style={{ color: "blue" }}>$ {prod.price}</h4>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Products;
