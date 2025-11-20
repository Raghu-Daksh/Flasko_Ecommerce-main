import React, { useEffect } from "react";
import "./Home.css";
import Category from "../category/Category";
import { useDispatch, useSelector } from "react-redux";
import { productListAction } from "../../redux/action/productAction";
import CarouselSlide from "../carousel/Carousel";
import Card from "./card";

const Home = () => {
  const dispatch = useDispatch();
  const {products} = useSelector((state)=>state.displayProductsReducer);
console.log(products);


  useEffect(()=>{
    dispatch(productListAction());
  },[dispatch])

  return (
    <div className="home-container">
     <Category/>
      <CarouselSlide />
      <div className="home">
        {
          products?.slice(0,20)?.map((item, key)=>(
            <Card item={item} />
          ))
        }
      </div>
    </div>
  );
};

export default Home;
