import React, { createContext, useContext, useState } from "react";
import { ProductType } from "../Components/Products";

type ProductContextProps = {
  children: React.ReactNode;
};

type Product = {
  products: ProductType[] | null;
  setProducts: React.Dispatch<React.SetStateAction<ProductType[] | null>>;
  filteredData: ProductType[] | null;
  setFilteredData: React.Dispatch<React.SetStateAction<ProductType[] | null>>;
  isFiltering: boolean | null;
  setIsFiltering: React.Dispatch<React.SetStateAction<boolean | null>>;
};

export const ProductContext = createContext<Product | null>(null);
function ProductsProvider({ children }: ProductContextProps) {
  const [products, setProducts] = useState<ProductType[] | null>(null);
  const [filteredData, setFilteredData] = useState<ProductType[] | null>(null);

  const [isFiltering, setIsFiltering] = useState<boolean | null>(null);
  return (
    <ProductContext.Provider
      value={{
        products,
        setProducts,
        isFiltering,
        setIsFiltering,
        filteredData,
        setFilteredData,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

export const ProductState = () => {
  return useContext(ProductContext);
};

export default ProductsProvider;
