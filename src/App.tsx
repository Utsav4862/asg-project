import React from "react";
import Search from "./Pages/Search";
import "./App.css";
import ProductsProvider from "./Context/ProductsProvider";

function App() {
  return (
    <ProductsProvider>
      <div className="App">
        <Search />
      </div>
    </ProductsProvider>
  );
}

export default App;
