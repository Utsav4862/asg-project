import { type } from "@testing-library/user-event/dist/type";
import React, { useState } from "react";
import Filter from "../Components/Filter";
import Products from "../Components/Products";
import SuggestionBox from "../Components/SuggestionBox";

import "./Search.css";

type SearchProp = {};

function Search() {
  const [isFocused, setIsFocused] = useState<Boolean>(false);

  const modelShow = () => {
    console.log("focused");
    setIsFocused(true);
  };

  return (
    <div className="wrapper">
      <div className="search-wrapper">
        <input
          type={"text"}
          className="search-txt"
          onFocus={modelShow}
          placeholder={"Search"}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      <div className="main">
        {isFocused ? (
          <div className="suggestion-wrapper">
            <SuggestionBox />
          </div>
        ) : (
          ""
        )}
        <div className="main-content-wrapper">
          <div style={{ width: "19%", borderRadius: 10 }}>
            <Filter />
          </div>
          <div style={{ width: "79%", borderRadius: 10 }}>
            <Products />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
