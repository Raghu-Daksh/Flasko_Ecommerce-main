import { Button } from "@mui/material";
import react, { useEffect } from "react";
import './productDetails.css'
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { productDetailsAction, productListAction } from "../../redux/action/productAction";
import Slide from '../home/slider'
import { addToCartAction } from "../../redux/action/cartAction";
import ActionItem from "./actionItem";

const ProductDetails = () => {
  const {_id} = useParams();

  const dispatch = useDispatch();
  const {product} = useSelector(state=>state.getProductDetailsReducer);  
  const {products} = useSelector((state)=>state.displayProductsReducer);

  
  useEffect(()=>{
    if(product && _id != product._id ){
      dispatch(productDetailsAction(_id));
      dispatch(productListAction());

    }

 },[dispatch, _id, product]);

  return (
    <>{
      product && Object.keys(product).length &&
        <div className="product-details">
          <div className="product-details-row-1">
            <ActionItem product={product} />
          </div>
          <div className="product-details-row-2">
            <p style={{fontWeight: "400", fontSize: "20px"}}>
            {product?.description}
            </p>
            <p className="ratings" >
              <span> <ion-icon name="star"></ion-icon>4.2</span> ratings
            </p>
            <p className="product-details-price"> ₹ 42000
            <span style={{ fontWeight:"500"}}> 17% off</span> 
            </p>
            <p>Description</p>
            <p className="product-details-description">
              Get a laptop that makes it effortless for you to multitask and
              simplifies your process. The high quality and vibrant colour display
              on this HP Pavilion laptop can make every image appear
              extraordinarily alive and genuine to you. Additionally, you
              accomplish tasks more quickly and comfortably while working on the
              move thanks to the strong AMD CPU and Graphics. You can transcend
              your restrictions and realise your full potential thanks to this
              laptop. Additionally, for adjusting built-in speakers and
              headphones, Bang & Olufsen provides user-selectable equalisation
              presets in addition to manual sound tuning. You can enjoy the ideal
              audio experience with B&O speakers and the dual speaker setup of the
              HP laptop.
            </p>
          </div>
        </div>
    }
       <Slide products={products.slice(0,8)}  />
      <Slide products={products.slice(9,16)} />
    </>
  );
};
export default ProductDetails;
