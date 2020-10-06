import { configureStore } from "@reduxjs/toolkit";
import errorReducer from "../features/error/errorSlice";
import authenticationReducer from "../features/authentication/authenticationSlice";

export default configureStore({
  reducer: {
    error: errorReducer,
    authentication: authenticationReducer,
  },
});
