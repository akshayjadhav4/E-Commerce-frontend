import { createSlice } from "@reduxjs/toolkit";
import { setError, clearError } from "../error/errorSlice";
import { API } from "../../api/backend";

export const categoriesSlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    message: "",
    isLoading: false,
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
      state.isLoading = false;
    },
    setLoading: (state) => {
      state.isLoading = true;
      state.message = "";
    },
    addCategory: (state, action) => {
      state.categories = [action.payload, ...state.categories];
      state.isLoading = false;
      state.message = `${action.payload.name} category created.`;
    },
    deleteCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category._id !== action.payload
      );
    },
  },
});

export const {
  setCategories,
  setLoading,
  addCategory,
  deleteCategory,
} = categoriesSlice.actions;

export const createCategory = (userID, token, category) => async (dispatch) => {
  dispatch(setLoading());
  await fetch(`${API}/category/create/${userID}`, {
    //header info
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        dispatch(setError(data.error));
      } else {
        dispatch(addCategory(data));
        dispatch(clearError());
      }
    })
    .catch((error) => dispatch(setError(error)));
};

export const getCategories = () => async (dispatch) => {
  dispatch(setLoading());
  await fetch(`${API}/categories`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        dispatch(setError(data.error));
      } else {
        dispatch(setCategories(data));
        dispatch(clearError());
      }
    })
    .catch((error) => dispatch(setError(error)));
};

export const selectCategories = (state) => state.categories;

export default categoriesSlice.reducer;
