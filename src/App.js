import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import { useDispatch } from "react-redux";
import { isAuthenticated } from "./features/authentication/authenticationSlice";
import { getAllProducts } from "./features/products/productsSlice";
import { getCart } from "./features/cart/cartSlice";
import PrivateRoute from "./helpers/auth/PrivateRoutes";
import AdminRoute from "./helpers/auth/AdminRoutes";
import AdminDashboard from "./components/AdminDashboard/AdminDashboard";
import UpdateProduct from "./components/UpdateProduct/UpdateProduct";
import ViewProduct from "./components/ViewProduct/ViewProduct";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";

function App() {
  const dispatch = useDispatch();

  // to check user is already logged in
  useEffect(() => {
    dispatch(isAuthenticated());
  }, [dispatch]);

  // get all products
  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);
  return (
    <div className="app">
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/viewproduct/:productId" exact component={ViewProduct} />
        <Route path="/cart" exact component={Cart} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <PrivateRoute path="/user/checkout" exact component={Checkout} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute
          path="/admin/create/category"
          exact
          component={AdminDashboard}
        />
        <AdminRoute
          path="/admin/manage/category"
          exact
          component={AdminDashboard}
        />
        <AdminRoute
          path="/admin/create/product"
          exact
          component={AdminDashboard}
        />
        <AdminRoute
          path="/admin/manage/prodcuts"
          exact
          component={AdminDashboard}
        />
        <AdminRoute
          path="/admin/update/:productId"
          exact
          component={UpdateProduct}
        />
        <AdminRoute
          path="/admin/manage/orders"
          exact
          component={AdminDashboard}
        />
      </Router>
    </div>
  );
}

export default App;
