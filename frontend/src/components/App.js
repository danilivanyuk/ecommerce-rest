import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Homepage from "./Homepage/Homepage";
import Navbar from "./Navbar/Navbar";
import Profile from "./Profile/Profile";
import Cart from "./Cart/Cart";
import "./static/main.css";

export default function App() {
  return (
    <div className="mx-auto">
      <Router basename="/">
        <Fragment>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Fragment>
      </Router>
    </div>
  );
}
