import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "../Utils/PrivateRoute";

import routes from "../routes";
import jwtDecode from "jwt-decode";
// utils
import config from "../Utils/config";
// MUi stuff

import { CssBaseline, ThemeProvider } from "@material-ui/core";

// components
// pages
import Dashboard from "../Components/Pages/Dashboard/Dashboard";
import store from "../Redux/store";
import { logoutUser } from "../Redux/actions/authActions";
import { SET_AUTHENTICATED } from "../Redux/types";
import { useTheme } from "../Theme/theme";
import axios from "axios";
import Alert from "../Components/Base/Alert";

// decidin on the backend service to use
axios.defaults.baseURL = config.BACKEND_SERVICE;

function App() {
    const [currentTheme] = useTheme();

    React.useEffect(() => {
        // checking for jwt
        const jwtToken = localStorage.getItem("token");

        /*eslint-disable eqeqeq */
        if (jwtToken == "Bearer undefined" || null || "undefined") return;
        if (jwtToken) {
            const decodeToken = jwtDecode(localStorage.token);
            if (decodeToken.exp * 1000 < Date.now()) {
                store.dispatch(logoutUser());
            } else {
                store.dispatch({ type: SET_AUTHENTICATED });
                axios.defaults.headers.common["Authorization"] =
                    localStorage.token;
            }
        } else {
            console.log("silly burger, you aint breaking today");
            localStorage.clear();
            return true;
        }
    });

    return (
        <ThemeProvider theme={currentTheme}>
            <Alert />
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
