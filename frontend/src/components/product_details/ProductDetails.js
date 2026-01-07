import { Button } from "@mui/material";
import react, { Suspense, useEffect } from "react";
import "./productDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  productDetailsAction,
  productListAction,
} from "../../redux/action/productAction";
import Slide from "../home/slider";
import { addToCartAction } from "../../redux/action/cartAction";
import ActionItem from "./actionItem";
import { fetchProducts, productsDetails } from "../../slices/productSlice";
import ProductsSkeleton from "../ProductsSkeleton/ProductsSkeleton";

const ProductDetails = () => {
  const { _id } = useParams();

  const dispatch = useDispatch();
  const { productsData, productDetail: product } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    console.log(_id);
    dispatch(productsDetails(_id));
    dispatch(fetchProducts());
  }, [dispatch, _id]);

  return (
    <>
      {product && Object.keys(product).length && (
        <div className="product-details">
          <div className="product-details-row-1">
            <ActionItem product={product} />
          </div>
          <div className="product-details-row-2">
            <p style={{ fontWeight: "400", fontSize: "20px" }}>
              {product?.description}
            </p>
            <p className="ratings">
              <span>
                {" "}
                <ion-icon name="star"></ion-icon>4.2
              </span>{" "}
              ratings
            </p>
            <p className="product-details-price">
              {" "}
              ₹ 42000
              <span style={{ fontWeight: "500" }}> 17% off</span>
            </p>
            <p>Description</p>
            <p className="product-details-description">
              {product?.description}
            </p>
          </div>
        </div>
      )}

      <Suspense fallback={<ProductsSkeleton />}>
        <Slide products={productsData.slice(0, 8)} />
      </Suspense>

      <Suspense fallback= {<ProductsSkeleton />}>
        <Slide products={productsData.slice(9, 16)} />
      </Suspense>

      {/* <ProductsSkeleton /> */}
    </>
  );
};
export default ProductDetails;
