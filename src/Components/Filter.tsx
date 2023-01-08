import { Rating } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Context/ProductsProvider";
import { Categories } from "../Data/Categories";
import { ProductType } from "./Products";

type Price = {
  less_500?: boolean;

  great_500_less_750?: boolean;
  great_750_less_1000?: boolean;
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
    new Array(3).fill(false)
  );
  const [isCategoryChecked, setIsCategoryChecked] = useState<boolean[]>(
    new Array(4).fill(false)
  );

  const [filterCat, setFilterCat] = useState<ProductType[]>([]);
  const [filterPrice, setFilterPrice] = useState<ProductType[]>([]);

  const [filterProds, setFilterProds] = useState<FilterValues>({
    categories: {
      men: false,
      women: false,
      jewellery: false,
      electronics: false,
    },
    price: {
      less_500: false,
      great_500_less_750: false,
      great_750_less_1000: false,
    },
  });

  const onPriceChange = (e: any, i: number) => {
    let data = { ...isPricesChecked };
    data[i] = !data[i];
    setIsPricesChecked(data);

    let data2 = filterProds;
    let filter = {
      categories: data2.categories,
      price: {
        less_500: data[0],

        great_500_less_750: data[1],
        great_750_less_1000: data[2],
      },
    };
    setFilterProds(filter);
    filterByPrice(filter);
  };

  const onCatChange = (e: any, i: number) => {
    let data = { ...isCategoryChecked };
    data[i] = !data[i];
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
    filterByCat(filter);
  };

  const filterByCat = (v: FilterValues) => {
    let data;
    if (filterPrice.length != 0) {
      data = filterPrice;
      // console.log(productContext?.filteredData);
    } else data = productContext?.products;
    console.log(data);

    let filteredData = data?.filter((prod: ProductType) => {
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

      return men || jewelery || women || electronics;
    });
    if (filteredData?.length == 0) {
      productContext?.setIsFiltering(false);
    } else productContext?.setIsFiltering(true);
    console.log(filteredData);
    setFilterCat(filteredData!);

    productContext?.setFilteredData(filteredData!);
  };

  const filterByPrice = (v: FilterValues) => {
    let data;
    if (filterCat.length != 0) {
      data = filterCat;
      // console.log(productContext?.filteredData);
    } else data = productContext?.products;
    console.log(data);

    let filteredData = data?.filter((prod: ProductType) => {
      let less_500 = false,
        great_500_less_750 = false,
        great_750_less_1000 = false;
      if (v.price?.less_500 && prod.price <= 500) {
        less_500 = true;
      } else if (
        v.price?.great_500_less_750 &&
        prod.price > 500 &&
        prod.price <= 750
      )
        great_500_less_750 = true;
      else if (
        v.price?.great_750_less_1000 &&
        prod.price > 750 &&
        prod.price <= 1000
      )
        great_750_less_1000 = true;
      return less_500 || great_500_less_750 || great_750_less_1000;
    });
    if (filteredData?.length == 0) {
      productContext?.setIsFiltering(false);
    } else productContext?.setIsFiltering(true);
    setFilterPrice(filteredData!);
    productContext?.setFilteredData(filteredData!);
  };

  useEffect(() => {
    // filterData();
  }, [filterProds, isCategoryChecked]);
  return (
    <div className="filter">
      <h1 style={{ fontWeight: "500", marginBottom: 10 }}>Filters</h1>
      <div style={{ marginBottom: 15 }}>
        <h3 style={{ fontWeight: "bold", marginBottom: 5 }}>Price</h3>

        {["Under 500", "500 To 750", "750 To 1000"].map((cat, i) => (
          <div>
            <input
              type={"checkbox"}
              id={cat}
              checked={isPricesChecked[i]}
              onChange={(e: any) => {
                // on(e, i);
                onPriceChange(e, i);
              }}
            />
            <label htmlFor={cat}> {cat} </label>
          </div>
        ))}
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
              // onClick={(e) => onCatChange(e, 0)}
            />
            <label htmlFor={cat.id}> {cat.label} </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Filter;
