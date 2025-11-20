import { useDispatch } from "react-redux";
import { addToCartAction } from "../../redux/action/cartAction";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { payUsingPaytm } from "../../service/api";
import { backendApi, post } from "../../utils/paytm";
import { useEffect } from "react";

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

function loadRazorpayScript() {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);

    document.body.appendChild(script);
  });
}


  const handleBuyNow = async (amount) => {

  // 1. Load Razorpay script
  const res = await loadRazorpayScript();
  if (!res) {
    alert("Payment SDK failed to load!");
    return;
  }

  // 2. Create order from backend
  const orderResponse = await fetch(`${backendApi}/api/payment/create-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });
  const order = await orderResponse.json();

  // 3. Razorpay payment options
  const options = {
    key: "rzp_test_Rhc7KDFTLLV3f9", // frontend key_id
    amount: order.order.amount,
    currency: "INR",
    name: "Flasko Store",
    description: "Order Payment",
    order_id: order.order.id,

    handler: async function (response) {
      // send details to backend for verification
      const verify = await fetch(`${backendApi}/api/payment/verify-payment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(response),
      });

      const result = await verify.json();
      if (result.success) {
        alert("Payment Successful!");
      } else {
        alert("Payment Verification Failed!");
      }
    },

    theme: {
      color: "#000000",
    }
  };

  const paymentObj = new window.Razorpay(options);
  paymentObj.open();
};


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
            <img
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
          onClick={() => dispatch(addToCartAction(product._id, 1))}
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
