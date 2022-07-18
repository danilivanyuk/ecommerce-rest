import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getCategories } from "../features/categoriesSlice";
import { getSubCategories } from "../features/subCategoriesSlice";
import { getProducts } from "../features/productsSlice";

import Homepage from "./Homepage/Homepage";
import Navbar from "./Navbar/Navbar";
import Profile from "./Profile/Profile";
import Category from "./Category/Category";
import Product from "./Product/Product";
import Cart from "./Cart/Cart";
import "./static/main.css";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getSubCategories());
    dispatch(getProducts());
  }, []);

  return (
    <div className="mx-auto">
      <Router basename="/">
        <Fragment>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path=":category/:subcategory/" element={<Category />}>
              <Route path=":productTitle" element={<Product />} />
            </Route>
            <Route path="profile" element={<Profile />} />
            <Route path="cart" element={<Cart />} />
          </Routes>
          {/* <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path={`/category/:subcategoryName`} element={<Category />} />
            <Route path="/product/:productSlug" element={<Product />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/cart" element={<Cart />} />
          </Routes> */}
        </Fragment>
      </Router>
    </div>
  );
}
