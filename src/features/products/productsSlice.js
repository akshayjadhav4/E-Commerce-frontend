import { createSlice } from "@reduxjs/toolkit";
import { setError, clearError } from "../error/errorSlice";
import { API } from "../../api/backend";

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productMessage: "",
    isLoading: false,
  },
  reducers: {},
});

export const {} = productsSlice.actions;

export const selectProducts = (state) => state.products;

export default productsSlice.reducer;
