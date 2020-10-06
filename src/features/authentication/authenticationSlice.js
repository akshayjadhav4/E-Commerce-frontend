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
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export const { setLoading, setUser } = authenticationSlice.actions;

export const signup = (user) => async (dispatch) => {
  dispatch(setLoading(true));
  await fetch(`${API}/signup`, {
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
      } else {
        if (typeof window !== "undefined") {
          localStorage.setItem("jwt", JSON.stringify(data));
          dispatch(setUser(data));
          dispatch(clearError());
        }
      }
    })
    .catch((error) => {
      dispatch(setError(error));
    });
  dispatch(setLoading(false));
};

export const signin = (user) => async (dispatch) => {
  dispatch(setLoading(true));
  await fetch(`${API}/signin`, {
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
      } else {
        if (typeof window !== "undefined") {
          localStorage.setItem("jwt", JSON.stringify(data));
          dispatch(setUser(data));
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
    dispatch(setUser(data));
  } else {
    return false;
  }
};

export const selectAuthentication = (state) => state.authentication;

export default authenticationSlice.reducer;
