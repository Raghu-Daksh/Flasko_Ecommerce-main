import React, { useRef, useState } from "react";
import "./category.css";
import { navData } from "../../data/data";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  const sliderRef = useRef();

  // drag state
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleCategory = (value) => {
    navigate(`/search/${value}`);
  };

  // MOUSE DOWN
  const startDrag = (e) => {
    isDown.current = true;
    sliderRef.current.classList.add("active-drag");

    startX.current = e.pageX - sliderRef.current.offsetLeft;
    scrollLeft.current = sliderRef.current.scrollLeft;
  };

  // MOUSE LEAVE
  const stopDragLeave = () => {
    isDown.current = false;
    sliderRef.current.classList.remove("active-drag");
  };

  // MOUSE UP
  const stopDrag = () => {
    isDown.current = false;
    sliderRef.current.classList.remove("active-drag");
  };

  // MOUSE MOVE
  const handleDrag = (e) => {
    if (!isDown.current) return;
    e.preventDefault();

    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // drag speed
    sliderRef.current.scrollLeft = scrollLeft.current - walk;
  };

  // BUTTONS (optional manual scroll)
  const scrollLeftBtn = () => {
    sliderRef.current.scrollBy({ left: -250, behavior: "smooth" });
  };

  const scrollRightBtn = () => {
    sliderRef.current.scrollBy({ left: 250, behavior: "smooth" });
  };

  return (
    <div className="category-slider-wrapper">
      <button className="slider-btn left" onClick={scrollLeftBtn}>
        &#10094;
      </button>

      <div
        className="categorys"
        ref={sliderRef}
        onMouseDown={startDrag}
        onMouseLeave={stopDragLeave}
        onMouseUp={stopDrag}
        onMouseMove={handleDrag}
      >
        {navData.map((item, key) => (
          <div
            className="category"
            key={key}
            onClick={() => handleCategory(item.text)}
          >
            <img src={item.url} alt={item.text} />
            <p>{item.text}</p>
          </div>
        ))}
      </div>

      <button className="slider-btn right" onClick={scrollRightBtn}>
        &#10095;
      </button>
    </div>
  );
};

export default Category;
