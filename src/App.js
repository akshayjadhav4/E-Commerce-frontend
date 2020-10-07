import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";
import Signin from "./components/Signin/Signin";
import UserDashboard from "./components/UserDashboard/UserDashboard";
import { useDispatch } from "react-redux";
import { isAuthenticated } from "./features/authentication/authenticationSlice";
import PrivateRoute from "./helpers/auth/PrivateRoutes";
function App() {
  const dispatch = useDispatch();

  // to check user is already logged in
  useEffect(() => {
    dispatch(isAuthenticated());
  }, [dispatch]);
  return (
    <div className="app">
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/signin" exact component={Signin} />
        <PrivateRoute path="/user/dashboard" exact component={UserDashboard} />
        <PrivateRoute path="/admin/dashboard" exact component={UserDashboard} />
      </Router>
    </div>
  );
}

export default App;
