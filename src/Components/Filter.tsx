import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Context/ProductsProvider";
import { Categories } from "../Data/Categories";
import { ProductType } from "./Products";

type Price = {
  less_250?: boolean;
  great_250_less_500?: boolean;
};

type Category = {
  men?: boolean;
  women?: boolean;
  jewellery?: boolean;
  electronics?: boolean;
};

type FilterValues = {
  price?: Price;
  categories?: Category;
};

function Filter() {
  const productContext = useContext(ProductContext);
  const [isPricesChecked, setIsPricesChecked] = useState<boolean[]>(
    new Array(4).fill(false)
  );
  // const [isCategoryChecked, setIsCategoryChecked] = useState<Categories>({
  //   men: false,
  //   women: false,
  // });
  const [isCategoryChecked, setIsCategoryChecked] = useState<boolean[]>(
    new Array(4).fill(false)
  );

  const [filterProds, setFilterProds] = useState<FilterValues>({
    categories: {
      men: false,
      women: false,
      jewellery: false,
      electronics: false,
    },
    // price: {
    //   less_250: false,
    //   great_250_less_500: false,
    // },
  });

  const onCatChange = (e: any, i: number) => {
    console.log(e.target.checked);
    console.log(isCategoryChecked);
    let data = { ...isCategoryChecked };
    data[i] = !data[i];
    console.log(data);
    setIsCategoryChecked(data);

    let data2 = filterProds;
    let filter = {
      categories: {
        men: data[0],
        women: data[1],
        jewellery: data[2],
        electronics: data[3],
      },
      price: data2.price,
    };
    setFilterProds(filter);
    filterData(filter);
  };

  const filterData = (v: FilterValues) => {
    console.log(productContext?.products);
    let data: ProductType[] = [];
    if (productContext?.products) {
      data = [...productContext.products];
    }
    let filteredData = productContext?.products?.filter((prod: ProductType) => {
      let men = false,
        women = false,
        jewelery = false,
        electronics = false;
      if (v.categories?.men && prod.category == "men's clothing") {
        console.log(prod.category);
        men = true;
      } else if (v.categories?.women && prod.category == "women's clothing") {
        women = true;
      } else if (v.categories?.jewellery && prod.category == "jewelery")
        jewelery = true;
      else if (v.categories?.electronics && prod.category == "electronics")
        electronics = true;
      return men || women || jewelery || electronics;
    });
    console.log(filteredData);

    productContext?.setFilteredData(filteredData!);
  };

  useEffect(() => {
    // filterData();
  }, [filterProds, isCategoryChecked]);
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
        {Categories.map((cat, i) => (
          <div>
            <input
              type={"checkbox"}
              id={cat.id}
              checked={isCategoryChecked[i]}
              onChange={(e: any) => {
                onCatChange(e, i);
              }}
              onClick={(e) => onCatChange(e, 0)}
            />
            <label htmlFor={cat.id}> {cat.label} </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filter;
