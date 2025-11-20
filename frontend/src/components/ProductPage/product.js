import Card from "../home/card";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  getSortedData,
  productListAction,
} from "../../redux/action/productAction";
import "./product.css";
import SideBar from "../home/sidebar";

const Product = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.sortProductsReducer);
  const filterProducts = useSelector((state) => state.filterProductsReducer);

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortData, setSortData] = useState();
  const [itemsPerPage] = useState(9);

  
  

  useEffect(() => {
    dispatch(getSortedData(sortData));
  }, [dispatch, sortData, filterProducts]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems;

  if (products || filterProducts.products.length <= 0)
    currentItems = products?.slice(indexOfFirstItem, indexOfLastItem);
  if (products && filterProducts.products.length > 0) {
    currentItems = filterProducts?.products?.slice(indexOfFirstItem, indexOfLastItem);
  
  }

  let results =  filterProducts.products.length > 0? Math.ceil(filterProducts?.products?.length / itemsPerPage) : Math.ceil(products?.length / itemsPerPage)


  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="product-sec ">
      <div className="products">
        <div className="sideBar">
          <SideBar />
        </div>
        <div className="product-list">
          {/* <div className="sorting">
            <select
              className="sortings"
              value={sortData}
              onChange={(e) => setSortData(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="price high to low">price high to low</option>
              <option value="price low to high">price low to high</option>
              <option value="top ratings">top ratings</option>
            </select>
          </div> */}
          <div className="productsList">
            {currentItems.map((item, key) => (
              <Card item={item} />
            ))}
          </div>
        </div>
      </div>
      <div className="pagination">
        {Array.from({ length: results }).map(
          (el, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};
export default Product;
