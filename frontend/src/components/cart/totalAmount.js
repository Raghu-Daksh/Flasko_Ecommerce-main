import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Component = styled(Box)`
  width: 250px;
  height: 200px;
  margin-right: 20px;
`;
const Header = styled(Box)`
  background: white;
  padding: 20px 25px;
  border-bottom: 1px solid black;
  text-align: left;
`;
const Heading = styled(Box)`
  font-weight: 500;
`;
const Container = styled(Box)`
  padding: 20px 25px;
  background: white;
  & > p {
    margin-bottom: 20px;
    font-size: 14px;
}
& > h5 {
    font-size: 16px;
    margin-bottom: 20px;   
    font-weight: 600; 
  }
`;
const Price = styled(Box)`
  float: right;
`;

const Discount = styled(Typography)`
  color: green;
  font-weight: 600;
`;
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     

const TotalAmount = ({productListCart}) => {

  const navigate = useNavigate();
  // const {data} = useSelector(state=>state.addToCartReducer); 
  const [price , setPrice] = useState(0);
  
  let discount = 0; 
  return (
    <Component>
      <Header>
        <Heading>PRICE DETAILS</Heading>
      </Header>
      <Container>
        <Typography>
          Total Price 
          <Price component="span">
            {`₹${productListCart.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}   
            </Price>
        </Typography>
        <Typography>
          Discount <Price component="span"> ₹ {discount}</Price>
        </Typography>
        <Typography style={{borderBottom: '1px solid grey'}}>
          Delivery Charges <Price component="span"> ₹ 40</Price>
        </Typography>
        <Typography variant="h5">
          Total Amount <Price component="span"> ₹
               ₹ {productListCart.reduce((acc, item) => acc + item.quantity * item.price, 0) + 40}
          </Price>
        </Typography>
        <Discount style={{fontSize: '13px'}} >You will save  ₹ {discount} on this order </Discount>
      </Container>
    </Component>
  );
};

export default TotalAmount;
