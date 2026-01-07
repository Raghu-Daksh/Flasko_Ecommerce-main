import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./card.css";
import { Link } from "react-router-dom";

const Card = ({ item }) => {
  const { rating } = item;

  return (
    <div className="amazon-card">
      <Link 
        style={{ textDecoration: "none", color: "inherit" }}
        to={`/product_details/${item._id}`}
      >

        {/* IMAGE */}
        <div className="amazon-card-image">
          <LazyLoadImage width= '100%' height='180px' effect="blur" src={item?.thumbnail} alt={item.brand}/>
        </div>

        {/* TITLE */}
        <h4 className="amazon-card-title">
          {item.brand?.length >= 15 ? item.brand.slice(0, 15) + "..." : item.brand}
        </h4>

        {/* RATING */}
        <div className="amazon-card-rating">
          {Array.from({ length: Math.floor(rating) }).map((_, i) => (
            <ion-icon key={i} name="star" class="star"></ion-icon>
          ))}

          {!Number.isInteger(rating) && (
            <ion-icon name="star-half" class="star"></ion-icon>
          )}

          <span className="rating-count">({rating})</span>
        </div>

        {/* PRICE */}
        <div className="amazon-card-price">
          <span className="price">₹{item.price}</span>
          {item?.mrp && <span className="mrp">₹{item.mrp}</span>}
        </div>

        {/* FREE DELIVERY */}
        <p className="free-delivery">FREE Delivery</p>

        {/* BUTTON */}
        <button className="amazon-card-btn">View Details</button>

      </Link>
    </div>
  );
};

export default Card;
