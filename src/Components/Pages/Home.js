import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

// components
import Navbar from "../Layout/Navbar";
import Login from "./Auth/Login/Login";
import Register from "./Auth/Register/!RegisterFormik";
import Landing from "./Landing/Landing";

export class Home extends Component {
    render() {
        return (
            <>
                <Navbar />
                <div className="container">
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                    </Switch>
                </div>
            </>
        );
    }
}

export default Home;
