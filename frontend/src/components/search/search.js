import React, { useEffect } from "react";
import "./search.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { SearchProductsAction } from "../../redux/action/productAction";

const SearchPage = () => {
  const { key } = useParams();
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.searchProductReducer);

  useEffect(() => {
    dispatch(SearchProductsAction(key));
  }, [dispatch, key]);

  return (
    <div className="new-search-container">
      {searchResults && searchResults[0]?.map((product) => (
        <Link
          to={`/product_details/${product._id}`}
          className="new-search-card"
          key={product._id}
        >
          <div className="new-search-image">
            <img src={product.thumbnail} alt={product.title} />
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
      ))}
    </div>
  );
};

export default SearchPage;
