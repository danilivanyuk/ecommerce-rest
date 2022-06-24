import React from "react";
import ReactDOM from "react-dom";

import Homepage from "./homepage/Homepage";
import Navbar from "./Navbar/Navbar";

import "./static/main.css";

export default function App() {
  return (
    <div className="container mx-auto">
      <Navbar />
      <Homepage />
    </div>
  );
}
