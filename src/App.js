import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./utils.js/PrivateRoute";
import jwtDecode from "jwt-decode";
// utils
import config from "./utils.js/config";
// MUi stuff
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { CssBaseline } from "@material-ui/core";

// components
import Navbar from "./components/layout/Navbar";
import Dashboard from "./components/pages/Dashboard/Dashboard";
// pages
import Landing from "./components/pages/Landing/Landing";
import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";

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
                    <PrivateRoute
                        exact
                        path="/dashboard"
                        component={Dashboard}
                    />
                </Switch>
            </div>
            <CssBaseline />
        </>
    );
}

export default App;
