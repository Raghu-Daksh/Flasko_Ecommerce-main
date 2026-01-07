import React, { useEffect, useState } from "react";
import { category } from "../../data/data";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, filteredProducts } from "../../slices/productSlice";

const SideBar = ({setCurrentFilter}) => {
  const dispatch = useDispatch();
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [pricecategoryFilter, setPriceCategoryFilter] = useState();

  const { productsData:products } = useSelector((state) => state.products);

  let companyArr = ["All"];
  products.map((item) => {   
    companyArr.push(item.brand);
  });

  useEffect(() => {
    if (categoryFilter){
      dispatch(filteredProducts(categoryFilter));
      setCurrentFilter(categoryFilter)
      console.log(categoryFilter);
      
    }
    else if(pricecategoryFilter){
      dispatch(filteredProducts(pricecategoryFilter));
      setCurrentFilter(pricecategoryFilter)
      console.log(pricecategoryFilter);
      
    }
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
          min={20}
          max={10000}
          onChange={(e) => setPriceCategoryFilter(e.target.value)}
        />
      </div>
    </div>
  );
};

export default SideBar;
