import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./Utils/PrivateRoute";
import jwtDecode from "jwt-decode";
// utils
import config from "./Utils/config";
// MUi stuff

import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { CssBaseline } from "@material-ui/core";

// components
import Dashboard from "./Components/Pages/Dashboard/Dashboard";
// pages
import Landing from "./Components/Pages/Landing/Landing";
import Login from "./Components/Pages/Login/Login";
import Register from "./Components/Pages/Register/Register";

import axios from "axios";

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
});
// decidin on the backend service to use
axios.defaults.baseURL = config["BACKEND_SERVICE"];

// checking for jwt
let authenticated;
if (localStorage.token) {
    const decodeToken = jwtDecode(localStorage.token);
    if (decodeToken.exp * 1000 < Date.now()) {
        authenticated = false;
        // window.location.href = "/login";
    } else {
        authenticated = true;
    }
}

function App() {
    return (
        <>
            <div>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <PrivateRoute path="/dashboard" component={Dashboard} />
                </Switch>
            </div>
            <CssBaseline />
        </>
    );
}

export default App;
