import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="app">
      <Router>
        <Route path="/" exact component={Home} />
      </Router>
    </div>
  );
}

export default App;
