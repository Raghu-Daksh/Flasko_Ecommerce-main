import { useDispatch } from "react-redux";
import { addToCartAction } from "../../redux/action/cartAction";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { payUsingPaytm } from "../../service/api";
import { backendApi, post } from "../../utils/paytm";
import { useEffect } from "react";
import { addItem } from "../../slices/cartSlice";
import { handleBuyNow, loadRazorpayScript } from "../../utils/razorePayScript";

const ActionItem = ({ product }) => {
  const dispatch = useDispatch();

  const { images } = product;
  console.log(images);
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,

    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const addtoCartItemHandler = ()=>{
      dispatch(addItem(product))
  }



  return (
    <>
      <div className="product-details-row-1-images">
        <Carousel
          swipeable={false}
          draggable={false}
          responsive={responsive}
          infinite={true}
          keyBoardControl={true}
          showDots={true}
          slidesToSlide={1}
          containerClass="carousel-container"
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
        > 
          {images?.map((img) => (
            <LazyLoadImage effect = "blur"
              src={img}
              alt="product-image"
              className="product-details-row-1-image"
            />
          ))}
        </Carousel>
      </div>
      <div className="product-details-row-1-btns">
        
        <button
          className="product-details-row-1-btn add-to-cart-btn"
          onClick={addtoCartItemHandler}
        >
          Add to cart
        </button>
    
        <button className="product-details-row-1-btn buy-now-btn" onClick={() => handleBuyNow(product.price)}>
          Buy Now
        </button>
      </div>
    </>
  );
};

export default ActionItem;
