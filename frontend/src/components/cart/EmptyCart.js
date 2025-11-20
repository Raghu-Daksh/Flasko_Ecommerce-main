import styled from "@emotion/styled";
import { Box, Container, Typography } from "@mui/material";

const Component = styled(Box)`
    width: 80%;
    margin: 20px auto;
    height: 60vh;
    
`

const Main = styled(Box)`
    text-align:center;
    padding-top: 70px;
`

const EmptyCart = ()=>{
    const imgurl = 'https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90';
   
    return (
      <Component>
        <Main>
            <img src={imgurl} alt ="img" style={{width: '15%'}} />
            <Typography>Your cart is empty</Typography>
        </Main>
      </Component>  
    )
}

export default EmptyCart;