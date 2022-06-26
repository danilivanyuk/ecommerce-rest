import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Homepage from "./Homepage/Homepage";
import Navbar from "./Navbar/Navbar";

import "./static/main.css";

export default function App() {
  return (
    <div className="container mx-auto">
      <Router basename="/">
        <Fragment>
          <Navbar />
          <Switch>
            <Route path="/">
              <Homepage />
            </Route>
            {/* <Route path="/profile">
                <Profile/>
              </Route> */}
          </Switch>
        </Fragment>
      </Router>

      <Homepage />
    </div>
  );
}
