import React, { useContext, useEffect, useRef, useState } from "react";
import { ProductContext } from "../Context/ProductsProvider";
import { ProductType } from "./Products";
import "./style.css";

function SuggestionBox() {
  const productContext = useContext(ProductContext);
  const [trending, setTrending] = useState<ProductType[] | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  function generateProducts() {
    let prods: ProductType[] = [];
    // for (let i = 0; i < 5; i++) {
    //   let name = faker.commerce.productName();
    //   let price = faker.commerce.price();
    //   let img_url = faker.image.image(150, 150);
    //   products.push({ name, price, img_url });

    let len: number | undefined = productContext?.products?.length;

    for (let i = 0; i < 5; i++) {
      let j = Math.floor(Math.random() * 15);
      if (productContext?.products) prods.push(productContext.products[j]);
    }
    return prods;
    // for()
  }

  function generateSuggestions() {
    let sug = [];
    for (let i = 0; i < 5; i++) {
      let j = Math.floor(Math.random() * 15);
      if (productContext?.products)
        sug.push(productContext.products[j].category);
    }
    return sug;
  }

  useEffect(() => {
    let products: ProductType[] = generateProducts();
    let sug = generateSuggestions();
    setTrending(products);
    setSuggestions(sug);
  }, []);
  return (
    <div className="sug-box">
      <h3 className="heading">Latest Trends</h3>
      <div className="products-trending">
        {trending?.map((prod) => (
          <div className="product-trending" key={prod.id}>
            <img src={prod.image} width={"90%"} height={"70%"} />
            <div style={{ height: "29%" }}>
              <p style={{ textTransform: "capitalize" }}>
                {prod.title.length > 20
                  ? prod.title.slice(0, 16) + "..."
                  : prod.title}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h3 className="heading">Popular Suggestions</h3>
      {suggestions.map((sug, i) => (
        <p style={{ paddingLeft: 10, paddingBottom: 5 }} key={i}>
          {sug}
        </p>
      ))}
    </div>
  );
}

export default SuggestionBox;
