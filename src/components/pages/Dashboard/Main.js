import React, { Component } from "react";
import RouteWithSubRoutes from "../../../RouteWithSubRoutes";
import { Switch, withRouter } from "react-router-dom";

export class Main extends Component {
    constructor(props) {
        super(props);
    }

    goHome = () => {
        this.props.history.push(this.props.routes[0].path);
    };

    componentDidMount() {
        // redirect to the first available link
        if (this.props.location.pathname === "/dashboard") {
            this.goHome();
        }
    }

    render() {
        return (
            <>
                <h1>testing</h1>
                <Switch>
                    {this.props.routes.map((route, i) => (
                        <RouteWithSubRoutes key={i} {...route} />
                    ))}
                </Switch>
            </>
        );
    }
}

export default withRouter(Main);
