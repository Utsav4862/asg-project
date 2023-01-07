import { useState } from "react";

type Price = {
  less_250: boolean;
  great_250_less_500: boolean;
};

type Categories = {
  men: boolean;
  women: boolean;
};

type FilterValues = {
  price: Price;
  categories: Categories;
};

function Filter() {
  const [isPricesChecked, setIsPricesChecked] = useState<boolean[]>(
    new Array(2).fill(false)
  );

  const [filterProds, setFilterProds] = useState<FilterValues>({
    categories: {
      men: false,
      women: false,
    },
    price: {
      less_250: false,
      great_250_less_500: false,
    },
  });
  const [isCategoryChecked, setIsCategoryChecked] = useState<boolean[]>(
    new Array(2).fill(false)
  );

  const onFilterChange = (e: any) => {
    let value = e.target;
    setIsCategoryChecked(e.target.checked);
    console.log(e.target.checked);
  };
  return (
    <div className="filter">
      <h1 style={{ fontWeight: "500", marginBottom: 10 }}>Filters</h1>
      <div>
        <h3 style={{ fontWeight: "bold", marginBottom: 5 }}>Price</h3>

        <div>
          <input type={"checkbox"} id={"0-250"} checked={isPricesChecked[0]} />
          <label htmlFor="0-250"> Under 250 </label>
        </div>
        <div>
          <input
            type={"checkbox"}
            id={"250-500"}
            checked={isPricesChecked[1]}
          />
          <label htmlFor="250-500"> 250 to 500</label>
        </div>
      </div>

      <div>
        <h3 style={{ fontWeight: "bold", marginBottom: 5 }}>Category</h3>

        <div>
          <input
            type={"checkbox"}
            id={"men"}
            onChange={onFilterChange}
            checked={isCategoryChecked[0]}
          />
          <label htmlFor="men"> Men </label>
        </div>
        <div>
          <input
            type={"checkbox"}
            id={"women"}
            onChange={onFilterChange}
            checked={isCategoryChecked[1]}
          />
          <label htmlFor="women"> Women </label>
        </div>
      </div>
    </div>
  );
}

export default Filter;
