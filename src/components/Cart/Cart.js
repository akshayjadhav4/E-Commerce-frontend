import React from "react";
import "./Cart.css";
import BaseLayout from "../Base Layout/BaseLayout";
import { Alert } from "@material-ui/lab";
import { Grid, Typography, Button } from "@material-ui/core";
import ProductCard from "../ProductCard/ProductCard";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCart,
  cartEmpty,
  hideMessage,
} from "../../features/cart/cartSlice";
import SubTotal from "../../helpers/SubTotal/SubTotal";
import { Link } from "react-router-dom";

function Cart() {
  const dispatch = useDispatch();
  const { cartMessage, cart } = useSelector(selectCart);

  const removeAllProducts = () => {
    dispatch(cartEmpty);
    setTimeout(() => {
      dispatch(hideMessage());
    }, 1000);
  };

  return (
    <BaseLayout title="Your Cart">
      {/* Cart updated message */}
      {cartMessage && <Alert severity="success">{cartMessage}</Alert>}
      <br />
      <div className="cart">
        <div className="cart__amount">
          <SubTotal cart={cart} />
          <Button variant="outlined" onClick={removeAllProducts}>
            Empty Cart
          </Button>
          {cart?.length > 0 && (
            <Button variant="contained">
              <Link to="/user/checkout" className="cart__link">
                PROCEED TO CHECKOUT
              </Link>
            </Button>
          )}
        </div>
        {cart?.length > 0 ? (
          <div className="cart__products">
            <Grid container spacing={3}>
              {cart &&
                cart?.map((product, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
            </Grid>
          </div>
        ) : (
          <div className="cart__emptyMessage">
            <Typography variant="h5">Your cart is empty</Typography>
          </div>
        )}
      </div>
    </BaseLayout>
  );
}

export default Cart;
