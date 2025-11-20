import react, { useEffect, useState } from 'react'
import './carousel.css'
import {Box} from '@mui/material'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CarouselSlide = ()=>{

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

    return (
        <Carousel 
        swipeable={false}
        draggable={false}
        responsive={responsive}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        showDots={true}
        slidesToSlide={1}
        containerClass="carousel-container"
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        className="carousel">
            <div className="carousel-imgs">
                <img className='carousel-img' width="100%" src="https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            </div>
            <div className="carousel-imgs">
                <img className='carousel-img' width="100%" src="https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            </div>
            <div className="carousel-imgs">
                <img className='carousel-img' width="100%" src="https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
            </div>
        </Carousel>
    )   
}
export default CarouselSlide;