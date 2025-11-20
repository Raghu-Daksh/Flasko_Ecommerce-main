import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from "react";
import './slide.css'
import { Box, Typography, Button, Divider } from "@mui/material";
import styled from "@emotion/styled";
import Countdown from 'react-countdown';
import { Link, useNavigate } from "react-router-dom";

const Component = styled(Box)`
margin-top: 20px;
padding: 0 10px ;
background: #fff;
width:99%;
margin: 10px auto;
box-shadow: 0 0 2px black ;
`
const Deal = styled(Box)`
padding: 10px 5px;
display : flex;
align-items:center;
margin-bottom: 15px;
border-bottom: 1px solid rgb(204, 202, 202);
`
const CountDown = styled(Box)`
display: flex;
margin-left: 20px;
color: #7f7f7f;
text-align: center;
align-items:center;
font-size: 13px;
`
const Dealtext = styled(Typography)`
  font-weight: bold;
  line-height: 32px;
  font-size: 18px;
  letter-spacing: 0px;
`
const ViewButton = styled(Button)`
  background: black;
  color: white;
  margin-left: auto;
`
const Image = styled('img')`
  max-width: 250px;
  max-height: 150px;
`
const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,

    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,

    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,

    },
  };


const Slide = ({products, title}) => {  

  let limit = 8;
  const timerUrl = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg';
  const navigate = useNavigate()

  const viewAll = ()=>{
      navigate('/all')
  }

  const renderer = ({hours, minutes, seconds})=>{
    return <Box variant='span' >{hours} : {minutes} : {seconds} left </Box>
  }
  return (  
    <>
    <Component>
      <Deal>
        <Dealtext>{title}</Dealtext>
        {
          title == 'Deal of the day' ?
          <CountDown>
            <img width="15px" src={timerUrl} />
            <Countdown date={Date.now() + 5.04e7} renderer={renderer} />,
          </CountDown> :
            ''
        }
        <ViewButton variant="contained" onClick={viewAll} >View All</ViewButton>
      </Deal>
      <Divider /> 
      <Carousel
        swipeable={false}
        draggable={false}
        autoPlaySpeed={1000}
        keyBoardControl={true}
        infinite={true}
        centerMode={true}
        responsive={responsive}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-db-px"
      >
        {
          products ?
            products?.map((product,key) =>(
              <Link key={key} to={`/product_details/${product._id}`} style={{textDecoration: 'none'}} >
                <Box style={{padding: '25px 15px', textAlign: 'center' }}>
                  <Image src={product?.thumbnail} alt="product" className="slide-img" />
                  <Typography style={{fontWeight: 'bold', fontSize:'16px'  }} >{product?.title}</Typography>
                  <Typography style={{ fontSize:'14px'  }}  > <span style={{fontWeight: 'bold'}} >From</span> {product?.price}</Typography>
                </Box>
              </Link>
            ))
            :
           <Button>Refresh Again</Button>
        }
      </Carousel>

    </Component>
    </>
  );
};

export default Slide;
