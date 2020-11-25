import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import routes from "./routes";
import RouteWithSubRoutes from "./RouteWithSubRoutes";

// pages
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard/Dashboard";

function App() {
    return (
        <div className="App">
            <Switch>
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                ))}
            </Switch>
        </div>
    );
}

export default App;
