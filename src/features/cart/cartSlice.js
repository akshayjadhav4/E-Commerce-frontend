import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    cartMessage: "",
  },
  reducers: {
    addProductToCart: (state, action) => {
      state.cart = [action.payload, ...state.cart];
      state.cartMessage = `Product added to Cart `;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    hideMessage: (state) => {
      state.cartMessage = "";
    },
  },
});

export const { addProductToCart, setCart, hideMessage } = cartSlice.actions;

export const addToCart = (item) => (dispatch) => {
  let cart = [];
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }
    cart.push({ ...item });
    dispatch(addProductToCart({ ...item }));
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const getCart = () => (dispatch) => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("cart")) {
      const data = JSON.parse(localStorage.getItem("cart"));
      dispatch(setCart(data));
    }
  }
};

export const selectCart = (state) => state.cart;
export default cartSlice.reducer;
