import React, { useEffect } from "react";
import "./Home.css";
import Category from "../category/Category";
import { useDispatch, useSelector } from "react-redux";
// import { productListAction } from "../../redux/action/productAction"; // Unused import
import CarouselSlide from "../carousel/Carousel";
import Card from "./card";
import { fetchProducts } from "../../slices/productSlice";

const Home = () => {
  const dispatch = useDispatch();
  const { productsData } = useSelector((state) => state.products);
console.log(productsData);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="home-container">      
      <Category />
      <div className="carousel-wrapper-fix" style={{ minHeight: "30vh" }}>
        <CarouselSlide />
      </div>

      {/* 3. PRODUCT GRID */}
      <div className="home">
        {Array.isArray(productsData) &&
          productsData?.slice(0, 20)?.map((item, key) => (
            <Card key={key} item={item} />
          ))}
      </div>
    </div>
  );
};

export default Home;