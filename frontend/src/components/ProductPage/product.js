import Card from "../home/card";
import React from "react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./product.css";
import SideBar from "../home/sidebar";
import { fetchProducts, filteredProducts} from "../../slices/productSlice";

const Product = () => {
  const dispatch = useDispatch();

  const { productsData: products, } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentFilter, setCurrentFilter] = useState(1);


  const itemsPerPage  = 9;

  useEffect(() => {
    if(currentFilter){
      console.log(currentFilter);
      
      dispatch(filteredProducts(currentFilter));
    }else{
      dispatch(fetchProducts())
    }
  }, [dispatch,currentFilter]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems;

  if (products || products.length <= 0)
    currentItems = products?.slice(indexOfFirstItem, indexOfLastItem);
  if (products && products.length > 0) {
    currentItems = products?.slice(indexOfFirstItem, indexOfLastItem);
  }

  let results =  products.length > 0? Math.ceil(products?.length / itemsPerPage) : Math.ceil(products?.length / itemsPerPage)


  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  return (
    <div className="product-sec ">
      <div className="products">
        <div className="sideBar">
          <SideBar setCurrentFilter= {setCurrentFilter}/>
        </div>
        <div className="product-list">         
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
