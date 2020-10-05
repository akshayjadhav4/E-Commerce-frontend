import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Signup from "./components/Signup/Signup";

function App() {
  return (
    <div className="app">
      <Router>
        <Route path="/" exact component={Home} />
        <Route path="/signup" exact component={Signup} />
      </Router>
    </div>
  );
}

export default App;
