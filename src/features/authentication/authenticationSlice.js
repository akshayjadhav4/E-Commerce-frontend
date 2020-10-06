import { createSlice } from "@reduxjs/toolkit";
import { setError, clearError } from "../error/errorSlice";
import { API } from "../../api/backend";

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState: {
    user: null,
    token: null,
    isLoading: false,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setLoading, setUser, setToken } = authenticationSlice.actions;

export const signup = (user) => (dispatch) => {
  dispatch(setLoading(true));
  fetch(`${API}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        dispatch(setError(data.error));
        dispatch(setUser(null));
      } else {
        if (typeof window !== "undefined") {
          localStorage.setItem("jwt", JSON.stringify(data));
          dispatch(setUser(data.user));
          dispatch(setToken(data.token));
          dispatch(clearError());
        }
      }
    })
    .catch((error) => {
      dispatch(setError(error));
    });
  dispatch(setLoading(false));
};

export const isAuthenticated = () => (dispatch) => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    const data = JSON.parse(localStorage.getItem("jwt"));
    dispatch(setUser(data.user));
    dispatch(setToken(data.token));
  } else {
    return false;
  }
};

export const selectAuthentication = (state) => state.authentication;

export default authenticationSlice.reducer;
