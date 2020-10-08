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
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
      state.message = "";
    },
    addProductToList: (state, action) => {
      delete action.payload.photo;
      state.products = [action.payload, ...state.products];
      state.isLoading = false;
      state.productMessage = `${action.payload.name} product created.`;
    },
  },
});

export const { setLoading, addProductToList } = productsSlice.actions;

export const createProduct = (userID, token, product) => async (dispatch) => {
  dispatch(setLoading(true));
  await fetch(`${API}/product/create/${userID}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        dispatch(setError(data.error));
        dispatch(setLoading(false));
      } else {
        dispatch(addProductToList(data));
        dispatch(clearError());
      }
    })
    .catch((error) => dispatch(setError(error)));
};

export const selectProducts = (state) => state.products;

export default productsSlice.reducer;
