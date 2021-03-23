import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "../Utils/PrivateRoute";

import routes from "../routes";
import jwtDecode from "jwt-decode";
// utils
import config from "../Utils/config";
// MUi stuff

import { ThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { CssBaseline } from "@material-ui/core";
import { useTheme } from "../Theme/theme";
// components
// pages
import Dashboard from "../Components/Pages/Dashboard/Dashboard";

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
        window.location.href = "/login";
    } else {
        authenticated = true;
    }
}

function App() {
    const [currentTheme, setCurrentTheme] = useTheme();
    return (
        <ThemeProvider theme={currentTheme} setCurrentTheme={setCurrentTheme}>
            <Switch>
                {routes.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        component={route.component}
                    />
                ))}
                <PrivateRoute path="/dashboard" component={Dashboard} />
                <Route
                    exact
                    path="/"
                    render={() => <Redirect to="/dashboard" />}
                />
            </Switch>

            <CssBaseline />
        </ThemeProvider>
    );
}

export default App;
