import React, { useEffect, useState } from "react";
import { category } from "../../data/data";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilterData,
  productListAction,
} from "../../redux/action/productAction";

const SideBar = () => {
  const dispatch = useDispatch();
  const [categoryFilter, setCategoryFilter] = useState();
  const { products } = useSelector((state) => state.displayProductsReducer);

  let priceArr = [];
  let companyArr = ["All"];
  products.map((item) => {
    priceArr.push(item.price);
    companyArr.push(item.brand);
  });

  let maxPrice = Math.max(...priceArr);
  let minPrice = Math.min(...priceArr);

  const [pricecategoryFilter, setPriceCategoryFilter] = useState();

  useEffect(() => {
    if (categoryFilter) {
      dispatch(getFilterData(categoryFilter));
    }
    if (pricecategoryFilter) {
      dispatch(getFilterData(pricecategoryFilter));
    }
    dispatch(productListAction());
  }, [dispatch, categoryFilter, pricecategoryFilter]);

  return (
    <div className="sidebar">
      <div className="filter select-by-category">
        <h5>Category</h5>
        <div className="category-list">
          {category.map((item, key) => (
           <p
              className={
                categoryFilter === item
                  ? "selected-category active-category"
                  : "selected-category"
              }
              key={key}
              onClick={() => setCategoryFilter(item)}
            >
              {item}
            </p>
          ))}
        </div>
      </div>
      <div className="filter select-by-company">
        <h5>Company</h5>
        <div className="category-company-list">
          <select onClick={(e) => setCategoryFilter(e.target.value)}>
            {companyArr?.slice(0, 10).map((item, key) => (
              <option>{item}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="filter price-range">
        <h5>Price</h5>
        <p>₹ {pricecategoryFilter}</p>
        <input
          type="range"
          min={minPrice}
          max={maxPrice}
          onChange={(e) => setPriceCategoryFilter(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SideBar;
