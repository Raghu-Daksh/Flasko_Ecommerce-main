import styled from "@emotion/styled";
import { Box, Button, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import './cart.css'
import TotalAmount from "./totalAmount";
import EmptyCart from "./EmptyCart";
import { useEffect, useMemo } from "react";
import { backendApi } from "../../utils/paytm";
import { handleBuyNow, loadRazorpayScript } from "../../utils/razorePayScript";

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

    const {cartItems: productListCart} = useSelector(state=>state.cart);

    const totalAmt = useMemo( ()=> productListCart.reduce((acc, item) => acc + item.quantity * item.price, 0) + 40, [productListCart])


 
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