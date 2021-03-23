import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "../Utils/PrivateRoute";

import routes from "../routes";
import jwtDecode from "jwt-decode";
// utils
import config from "../Utils/config";
// MUi stuff

// import { ThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import { CssBaseline } from "@material-ui/core";

// components
// pages
import Dashboard from "../Components/Pages/Dashboard/Dashboard";
import store from "../Redux/store";
import { logoutUser } from "../Redux/actions/authActions";

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
        store.dispatch(logoutUser());
        window.location.href = "/login";
    } else {
        store.dispatch({ type: SET_AUTHENTICATED });
        axios.defaults.headers.common["Authorization"] = localStorage.token;
    }
}

function App() {
    return (
        <>
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
        </>
    );
}

export default App;
