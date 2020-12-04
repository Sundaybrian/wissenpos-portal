import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./utils.js/PrivateRoute";
import jwtDecode from "jwt-decode";

// MUi stuff
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard/Dashboard";

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
});

// checking for jwt
let authenticated;
if (localStorage.token) {
    const decodeToken = jwtDecode(localStorage.token);
    if (decodeToken.exp * 1000 < Date.now()) {
        window.location.href = "/login";
        authenticated = true;
    } else {
        authenticated = false;
    }
}

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <div className="App">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <PrivateRoute
                        exact
                        path="/dashboard"
                        component={Dashboard}
                        authenticated={authenticated}
                    />
                </Switch>
            </div>
        </MuiThemeProvider>
    );
}

export default App;
