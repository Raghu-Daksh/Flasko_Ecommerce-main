import styled from "@emotion/styled";
import { Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { addToCartAction, removeToCartAction } from "../../redux/action/cartAction";

const CartContainer = styled(Box)`
  display: flex;
  align-items: flex-start;
  background: #fff;
  padding: 20px;
  margin: 15px 0;
  border-radius: 16px;
  box-shadow: 0px 4px 20px rgba(0,0,0,0.06);
  gap: 20px;
  transition: 0.3s ease;

  &:hover {
    box-shadow: 0px 6px 26px rgba(0,0,0,0.12);
  }

  @media(max-width: 768px) {
    flex-direction: column;
  }
`;

const LeftSection = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProductImage = styled("img")`
  width: 160px;
  height: 150px;
  object-fit: cover;
  border-radius: 14px;
`;

const QtyController = styled(Box)`
  margin-top: 12px;
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 12px;
  overflow: hidden;

  button {
    background: #f2f2f2;
    border: none;
    padding: 8px 14px;
    cursor: pointer;
    font-size: 18px;
    transition: 0.2s;

    &:hover {
      background: #e6e6e6;
    }
  }

  input {
    width: 45px;
    text-align: center;
    font-size: 16px;
    padding: 6px;
    border: none;
  }
`;

const RightSection = styled(Box)`
  flex: 1;
`;

const Title = styled(Typography)`
  font-size: 18px;
  font-weight: 500;
  color: #222;
`;

const Price = styled(Typography)`
  margin-top: 8px;
  font-size: 20px;
  font-weight: 600;
  color: #000;
`;

const Rating = styled(Typography)`
  margin-top: 4px;
  font-size: 14px;
  color: #777;
`;

const RemoveBtn = styled(Typography)`
  margin-top: 12px;
  font-size: 15px;
  color: red;
  cursor: pointer;
  display: inline-block;
  transition: 0.2s;

  &:hover {
    text-decoration: underline;
    transform: translateX(2px);
  }
`;

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const removeItem = () => {
    dispatch(removeToCartAction(item.product));
  };

  const increaseQty = () => {
    dispatch(addToCartAction(item.product, item.quantity + 1));
  };

  const decreaseQty = () => {
    if (item.quantity > 1) {
      dispatch(addToCartAction(item.product, item.quantity - 1));
    }
  };

  return (
    <CartContainer>
      {/* LEFT IMAGE + QTY */}
      <LeftSection>
        <ProductImage src={item.image} alt="cart-product" />

        <QtyController>
          <button onClick={decreaseQty}>−</button>
          <input readOnly value={item.quantity} />
          <button onClick={increaseQty}>+</button>
        </QtyController>
      </LeftSection>

      {/* RIGHT DETAILS */}
      <RightSection>
        <Title>{item.description}</Title>

        <Rating>
          ⭐ 4.2 • <span style={{ color: "#444" }}>Ratings</span>
        </Rating>

        <Price>₹{item.price}</Price>

        <RemoveBtn onClick={removeItem}>Remove</RemoveBtn>
      </RightSection>
    </CartContainer>
  );
};

export default CartItem;
