import Card from "../home/card";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import "./product.css";
import SideBar from "../home/sidebar";
import { fetchProducts, filteredProducts} from "../../slices/productSlice";

const Product = () => {
  const dispatch = useDispatch();

  const { productsData: products, productFilter } = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  // const [productFilter, setproductFilter] = useState(1);

  const itemsPerPage  = 9;
  console.log(products);
  console.log(productFilter);
  

  useEffect(() => {
    if(productFilter){      
      dispatch(filteredProducts(productFilter));
    }else{
      dispatch(fetchProducts())
    }
  }, [dispatch, productFilter]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  let currentItems;

  let results
  if(Array.isArray(products)){
      if ((products || products.length <= 0) || (products && products.length > 0))
        currentItems = products?.slice(indexOfFirstItem, indexOfLastItem);    
       results =  products.length > 0? Math.ceil(products?.length / itemsPerPage) : Math.ceil(products?.length / itemsPerPage)
      
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const preBtn = () => {
    if(currentPage > 1){
      setCurrentPage(currentPage - 1)
    }
  }

  const nextBtn = () => {
    if(currentPage < results){
      setCurrentPage(currentPage + 1)
    }
  }

  return (
    <div className="product-sec ">
      <div className="products">
        <div className="sideBar">
          <SideBar/>
        </div>
        <div className="product-list">         
          <div className="productsList">
          {
            Array.isArray(currentItems) ?
            currentItems.map((item, key) => (
              <Card key={item._id} item={item} />
            )) :
            <h1>{products}</h1>
          
          }
          </div>
        </div>
      </div>
      <div className="pagination">
        {currentPage > 1 &&  <button onClick={preBtn}><ion-icon name="caret-back-outline"></ion-icon></button> }
        {Array.from({ length: results }).map(
          (el, index) => (
            <button className={`paginationBtn ${index+1 === currentPage ? 'activePage' : ''}`} key={el} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          )
        )}
      {currentPage < results && <button onClick={nextBtn}><ion-icon name="caret-forward-outline"></ion-icon></button>}
      </div>
    </div>
  );
};
export default Product;
