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
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category._id !== action.payload._id
      );
      state.isLoading = false;
      state.message = action.payload.data;
    },
    updateCategoryList: (state, action) => {
      let data = [...state.categories];
      let res = data.findIndex((obj) => obj._id === action.payload._id);
      data[res].name = action.payload.name;
      state.categories = data;
      state.isLoading = false;
      state.message = "Category Updated";
    },
  },
});

export const {
  setCategories,
  setLoading,
  addCategory,
  removeCategory,
  updateCategoryList,
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

export const deleteCategory = (categoryID, userID, token) => async (
  dispatch
) => {
  dispatch(setLoading());
  await fetch(`${API}/category/delete/${categoryID}/${userID}`, {
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
      } else {
        dispatch(removeCategory({ data: data.message, _id: categoryID }));
        dispatch(clearError());
      }
    })
    .catch((error) => dispatch(setError(error)));
};

export const updateCategory = (categoryID, userID, token, category) => async (
  dispatch
) => {
  dispatch(setLoading());
  await fetch(`${API}/category/update/${categoryID}/${userID}`, {
    //header info
    method: "PUT",
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
        dispatch(updateCategoryList(data));
        dispatch(clearError());
      }
    })
    .catch((error) => dispatch(setError(error)));
};

export const selectCategories = (state) => state.categories;

export default categoriesSlice.reducer;
