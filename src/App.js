import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import routes from "./routes";
import RouteWithSubRoutes from "./RouteWithSubRoutes";

// MUi stuff
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
});

function App() {
    return (
        <MuiThemeProvider theme={theme}>
            <div className="App">
                <Switch>
                    {routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </div>
        </MuiThemeProvider>
    );
}

export default App;
