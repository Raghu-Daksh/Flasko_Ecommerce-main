import react, { useEffect, useState } from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
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
         {/* Slide 1: Normal Image (No Change) */}
            <div className="carousel-imgs">
                <img
                    src="https://images.pexels.com/photos/963486/pexels-photo-963486.jpeg?_gl=1*16tj77t*_ga*MTQzMzEyMTkwMS4xNzY2MzMyMjEz*_ga_8JE65Q40S6*czE3NjYzMzIyMTMkbzEkZzEkdDE3NjYzMzIyOTIkajQ2JGwwJGgw"
                    alt="banner-1"
                    className='carousel-img'
                    fetchPriority="high"
                   style={{ 
                      width: "100%", 
                      height: "30vh", 
                      objectFit: "cover",
                      display: "block" 
                  }}
                />
            </div>

            {/* Slide 2: Updated LazyImage */}
            <div className="carousel-imgs">
                <LazyLoadImage
                    effect='blur'
                    className='carousel-img'
                    // YAHAN CHANGE HAI: Wrapper ko styling dena zaroori hai
                    // wrapperClassName="carousel-img-wrapper" 
                    width="100%"
                    height="30vh"
                    src="https://images.pexels.com/photos/4113798/pexels-photo-4113798.jpeg?_gl=1*cm2ri8*_ga*MTQzMzEyMTkwMS4xNzY2MzMyMjEz*_ga_8JE65Q40S6*czE3NjYzMzIyMTMkbzEkZzEkdDE3NjYzMzIzMzMkajUkbDAkaDA."
                    // Placeholder space reserve karne ke liye style style attribute bhi dein
                    style={{ objectFit: "cover"}} 
                />
            </div>

            {/* Slide 3: Updated LazyImage */}
            <div className="carousel-imgs">
                <LazyLoadImage
                    effect='blur'
                    className='carousel-img'
                    // wrapperClassName="carousel-img-wrapper"
                    width="100%"
                    height="30vh"
                    src="https://images.pexels.com/photos/4113868/pexels-photo-4113868.jpeg?_gl=1*nopwh*_ga*MTQzMzEyMTkwMS4xNzY2MzMyMjEz*_ga_8JE65Q40S6*czE3NjYzMzIyMTMkbzEkZzEkdDE3NjYzMzIzNzIkajQ2JGwwJGgw"
                    style={{ objectFit: "cover"}}
                />
            </div>
        </Carousel>
    )   
}
export default CarouselSlide;



















