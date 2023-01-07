import React, { createContext, useContext, useState } from "react";
import { ProductType } from "../Components/Products";

type ProductContextProps = {
  children: React.ReactNode;
};

type Product = {
  products: ProductType[] | null;
  setProducts: React.Dispatch<React.SetStateAction<ProductType[] | null>>;
};

export const ProductContext = createContext<Product | null>(null);
function ProductsProvider({ children }: ProductContextProps) {
  const [products, setProducts] = useState<ProductType[] | null>(null);
  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

export const ProductState = () => {
  return useContext(ProductContext);
};

export default ProductsProvider;
