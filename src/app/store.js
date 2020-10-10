import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "../features/error/errorSlice";
import authenticationReducer from "../features/authentication/authenticationSlice";
import categorySliceReducer from "../features/category/categorySlice";
import productsSliceReducer from "../features/products/productsSlice";
import cartSliceReducer from "../features/cart/cartSlice";

export default configureStore({
  reducer: {
    error: errorReducer,
    authentication: authenticationReducer,
    categories: categorySliceReducer,
    products: productsSliceReducer,
    cart: cartSliceReducer,
  },
});
