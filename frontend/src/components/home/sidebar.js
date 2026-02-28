import React, { useEffect, useState } from "react";
import { category } from "../../data/data";
import "./sidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, filteredProducts, setProductFilter } from "../../slices/productSlice";

const SideBar = () => {
  const dispatch = useDispatch();

  const { productsData:products,productFilter } = useSelector((state) => state.products);

  let companyArr = ["All"];
  Array.isArray(products) && products.map((item) => {   
    companyArr.push(item.brand);
  });

  useEffect(() => {
    if (productFilter){
      dispatch(filteredProducts(productFilter));
    }
  }, [dispatch,productFilter]);

  return (
    <div className="sidebar">
      <div className="filter select-by-category">
        <h5>Category</h5>
        <div className="category-list">
          {category.map((item, key) => (
           <p className={
                productFilter === item
                  ? "selected-category active-category"
                  : "selected-category"
              }
              key={item}
              onClick={() => dispatch(setProductFilter((item)))}
            >
              {item}
            </p>
          ))}
        </div>
      </div>
      <div className="filter select-by-company">
        <h5>Company</h5>
        <div className="category-company-list">
          <select onClick={(e) => dispatch(setProductFilter((e.target.value)))}>
            {companyArr?.slice(0, 10).map((item, key) => (
              <option>{item}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SideBar;


















































// import React, { useEffect, useState } from "react";
// import { category } from "../../data/data";
// import "./sidebar.css";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts, filteredProducts, setProductFilter } from "../../slices/productSlice";

// const SideBar = () => {
//   const dispatch = useDispatch();
//   const [categoryFilter, setCategoryFilter] = useState('All');
//   const [pricecategoryFilter, setPriceCategoryFilter] = useState();

//   const { productsData:products,productFilter } = useSelector((state) => state.products);

//   let companyArr = ["All"];
//   Array.isArray(products) && products.map((item) => {   
//     companyArr.push(item.brand);
//   });

//   useEffect(() => {
//     if (categoryFilter){
//       dispatch(filteredProducts(categoryFilter));
//       // dispatch(setProductFilter(categoryFilter))
//     }
//     // else if(pricecategoryFilter){
//     //   dispatch(filteredProducts(pricecategoryFilter));
//     //   dispatch(setProductFilter(pricecategoryFilter))
//     // }
//   }, [dispatch,productFilter, categoryFilter, pricecategoryFilter]);

//   return (
//     <div className="sidebar">
//       <div className="filter select-by-category">
//         <h5>Category</h5>
//         <div className="category-list">
//           {category.map((item, key) => (
//            <p className={
//                 productFilter === item
//                   ? "selected-category active-category"
//                   : "selected-category"
//               }
//               key={item}
//               onClick={() => setCategoryFilter(item)}
//             >
//               {item}
//             </p>
//           ))}
//         </div>
//       </div>
//       <div className="filter select-by-company">
//         <h5>Company</h5>
//         <div className="category-company-list">
//           <select onClick={(e) => setCategoryFilter(e.target.value)}>
//             {companyArr?.slice(0, 10).map((item, key) => (
//               <option>{item}</option>
//             ))}
//           </select>
//         </div>
//       </div>
//       {/* <div className="filter price-range">
//         <h5>Price</h5>
//         <p>₹ {pricecategoryFilter}</p>
//         <input
//           type="range"
//           min={20}
//           max={10000}
//           onChange={(e) => setPriceCategoryFilter(e.target.value)}
//         />
//       </div> */}
//     </div>
//   );
// };

// export default SideBar;
