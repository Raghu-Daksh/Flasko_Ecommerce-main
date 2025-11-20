import styled from "@emotion/styled";
import { Box, Button, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import './cart.css'
import TotalAmount from "./totalAmount";
import EmptyCart from "./EmptyCart";
import { useEffect } from "react";
import { backendApi } from "../../utils/paytm";

const Container = styled(Grid)`
    padding: 20px 135px ;
    gap:25px;
`

const LeftComponent = styled(Grid)`

`
const RightComponent = styled(Grid)`

`
const BottomWrapper = styled(Box)`
    padding: 16px 22px;
    background: #fff;
    box-shadow: 0 -2px 10px 0 rgb(0 0 0 / 10%);
    border-top: 1px solid #f0f0f0;
`;

const StyledButton = styled(Button)`
    display: flex;
    margin-left: auto;
    background: black;
    color: #fff;
    border-radius: 2px;
    width: 250px;
    height: 51px;
`;
const Cart = ()=>{

    const product = useSelector(state=>state.addToCartReducer);
    let productListCart = JSON.parse(localStorage.getItem('cartItems'));

    const totalAmt = productListCart.reduce((acc, item) => acc + item.quantity * item.price, 0) + 40
    console.log(totalAmt);
    
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
        {
            productListCart?.length>0 ?
                <Container container className="cart">
                    <LeftComponent  item lg={9} md={9} sm={12} xs={12} className="product-cart"  >
                        <div className="mycart">
                            <p>My Cart ({productListCart?.length})</p>
                        </div>
                        {
                            productListCart?.map((item, key)=>(
                                    <CartItem key={key} item = {item} />
                            ))
                        }
                        <BottomWrapper>
                            <StyledButton onClick={() => handleBuyNow(totalAmt)}>Place order</StyledButton>
                        </BottomWrapper>
                    </LeftComponent>
                    <RightComponent item lg={2} md={3} sm={12} xs={12} className="total-amount">
                        <TotalAmount productListCart = {productListCart} />
                    </RightComponent>
                </Container>
            :
            <div><EmptyCart /> </div>   
        }
        </>
    )
}

export default Cart;