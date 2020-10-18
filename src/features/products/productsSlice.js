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
      state.productMessage = "";
    },
    clearProductMessage: (state, action) => {
      state.productMessage = "";
    },
    addProductToList: (state, action) => {
      delete action.payload.photo;
      state.products = [action.payload, ...state.products];
      state.isLoading = false;
      state.productMessage = `${action.payload.name} product created.`;
    },
    fetchProducts: (state, action) => {
      state.products = action.payload;
      state.isLoading = false;
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
      state.isLoading = false;
      state.productMessage = action.payload.data;
    },
    updateProductFromList: (state, action) => {
      state.productMessage = `${action.payload.name} product updated.`;
    },
  },
});

export const {
  setLoading,
  addProductToList,
  fetchProducts,
  removeProduct,
  updateProductFromList,
  clearProductMessage,
} = productsSlice.actions;

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
    .catch((error) => dispatch(setError("ERROR WHILE CREATING PRODUCT")));
};

// get  all products
export const getAllProducts = () => async (dispatch) => {
  dispatch(setLoading(true));
  await fetch(`${API}/products`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        dispatch(setError(data.error));
        dispatch(setLoading(false));
      } else {
        dispatch(fetchProducts(data));
        dispatch(clearError());
      }
    })
    .catch((error) => dispatch(setError("ERROR WHILE FETCHING PRODUCTS")));
};

//delete product
export const deleteProduct = (productID, userID, token) => async (dispatch) => {
  dispatch(setLoading(true));
  await fetch(`${API}/product/delete/${productID}/${userID}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        dispatch(setError(data.error));
        dispatch(setLoading(false));
      } else {
        dispatch(removeProduct({ data: data.message, _id: productID }));
        dispatch(clearError());
      }
    })
    .catch((error) => {
      dispatch(setError("ERROR IN PRODUCT DELETE"));
    });
};

//update product
export const updateProduct = (productID, userID, token, product) => async (
  dispatch
) => {
  dispatch(setLoading(true));
  await fetch(`${API}/product/update/${productID}/${userID}`, {
    method: "PUT",
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
        dispatch(getAllProducts());
        dispatch(updateProductFromList(data));
        dispatch(clearError());
      }
    })
    .catch((error) => console.log("ERROR IN UPDATING PRODUCT INFO"));
};

export const selectProducts = (state) => state.products;

export default productsSlice.reducer;
