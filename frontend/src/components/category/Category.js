import React, { useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./category.css";
import { navData } from "../../data/data";
import { useNavigate } from "react-router-dom";

const Category = () => {
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  // Drag variables
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const isDragging = useRef(false); // New Flag to detect drag vs click

  const handleCategory = (value) => {
    // Agar user drag kar raha tha, toh navigate MAT karo
    if (isDragging.current) {
        return;
    }
    navigate(`/search/${value}`);
  };

  // MOUSE DOWN
  const startDrag = (e) => {
    isDown.current = true;
    isDragging.current = false; // Reset drag status
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
    
    // Note: 'isDragging' flag hum yahan false nahi karte, 
    // kyunki 'onClick' event mouseUp ke turant baad fire hota hai.
    // Hum ise agle click event ke baad reset karenge (automatic logic).
    setTimeout(() => {
        isDragging.current = false;
    }, 0);
  };

  // MOUSE MOVE
  const handleDrag = (e) => {
    if (!isDown.current) return;
    e.preventDefault();

    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX.current) * 2; // Speed multiplier
    sliderRef.current.scrollLeft = scrollLeft.current - walk;

    // Agar movement thodi si bhi hui (> 5px), toh isko Drag maano, Click nahi
    if (Math.abs(x - startX.current) > 5) {
        isDragging.current = true;
    }
  };

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
            // Capture click event properly
            onClickCapture={() => handleCategory(item.text)}
          >
            <img 
                effect="blur" 
                width='65px' 
                height='65px' 
                src={item.url} 
                alt={item.text} 
                // Image drag prevent karein taaki slider drag ho, image nahi
                draggable={false} 
                fetchPriority="high"
            />
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