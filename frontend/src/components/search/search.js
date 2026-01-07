import React, { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./search.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { SearchProductsAction } from "../../redux/action/productAction";
import { searchProducts } from "../../slices/productSlice";

const SearchPage = () => {
  const { key } = useParams();
  const dispatch = useDispatch();
  const {productsData} = useSelector((state) => state.products);
 
  useEffect(() => {
    dispatch(searchProducts(key));
  }, [dispatch, key]);

  return (
    <div className="new-search-container">
      {productsData && Array.isArray(productsData) ? productsData.map((product) => (
        <Link
          to={`/product_details/${product._id}`}
          className="new-search-card"
          key={product._id}
        >
          <div className="new-search-image">
            <LazyLoadImage loading="" src={product.thumbnail} alt={product.title} />
          </div>

          <div className="new-search-info">
            <h2 className="new-search-title">{product.title}</h2>

            <p className="new-search-desc">{product.description?.slice(0, 120)}...</p>

            <div className="new-search-rating">
              <span>{product.rating}★</span>
              <p>2000 ratings</p>
            </div>

            <div className="new-search-price">
              <h3>₹ {product.price}</h3>
              <p className="old">₹ 4000</p>
              <p className="off">{Math.round(2000 / 4000 * 100)}% off</p>
            </div>
          </div>
        </Link>
      ))
      :
      <h1>{productsData}</h1>
    }
    </div>
  );
};

export default SearchPage;
