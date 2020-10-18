import { createSlice } from "@reduxjs/toolkit";
import { setError, clearError } from "../error/errorSlice";
import { getAllProducts } from "../products/productsSlice";
import { API } from "../../api/backend";

export const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    orderMessage: "",
    isLoading: false,
  },
  reducers: {
    setLoading: (state) => {
      state.isLoading = true;
      state.orderMessage = "";
    },
    addOrder: (state, action) => {
      state.orders = [action.payload, ...state.orders];
      state.isLoading = false;
      state.orderMessage = `Your order created.`;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
      state.isLoading = false;
    },
  },
});

export const { setLoading, addOrder, setOrders } = orderSlice.actions;

export const createOrder = (userId, token, orderInfo) => async (dispatch) => {
  dispatch(setLoading());
  await fetch(`${API}/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ order: orderInfo }),
  })
    .then((reponse) => {
      return reponse.json();
    })
    .then((data) => {
      if (data.error) {
        dispatch(setError(data.error));
      } else {
        dispatch(addOrder(data));
        dispatch(getAllProducts());
        dispatch(clearError());
      }
    })
    .catch((err) => dispatch(setError("ERROR IN CREATING ORDER")));
};

export const getCustomerOrders = (userID, token) => async (dispatch) => {
  dispatch(setLoading());
  await fetch(`${API}/orders/${userID}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
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
        dispatch(setOrders(data));
        dispatch(clearError());
      }
    })
    .catch((error) =>
      dispatch(setError("ERROR IN GETTING CUSTOMER ORDER HISTORY"))
    );
};

export const getAllOrders = (userID, token) => async (dispatch) => {
  dispatch(setLoading());
  await fetch(`${API}/order/all/${userID}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
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
        dispatch(setOrders(data));
        dispatch(clearError());
      }
    })
    .catch((error) =>
      dispatch(setError("ERROR IN GETTING CUSTOMER ORDER FOR ADMIN "))
    );
};

export const selectOrders = (state) => state.order;

export default orderSlice.reducer;
