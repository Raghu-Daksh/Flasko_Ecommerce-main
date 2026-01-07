import React, { useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useDispatch, useSelector } from "react-redux";
import { productListAction } from "../../redux/action/productAction";
import { Link } from "react-router-dom";
import "./viewAll.css";

const ViewAll = () => {
  const { products } = useSelector((state) => state.displayProductsReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(productListAction());
  }, [dispatch]);

  return (
    <div className="viewall-container">
      {products?.map((product) => (
        <Link
          to={`/product_details/${product._id}`}
          className="viewall-card"
          key={product._id}
        >
          <div className="viewall-img-box">
            <LazyLoadImage effect = "blur" src={product.thumbnail} alt={product.title} />
          </div>

          <div className="viewall-info">
            <h3 className="viewall-title">
              {product.title?.slice(0, 30)}...
            </h3>

            <p className="viewall-rating">
              <span className="badge">{product.rating}★</span>
              <span className="count">2000 ratings</span>
            </p>

            <div className="viewall-price">
              <h4>₹ {product.price}</h4>
              <p className="old">₹ 4000</p>
              <p className="off">{Math.round(2000 / 4000 * 100)}% off</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ViewAll;
