import React, { Component } from "react";
import RouteWithSubRoutes from "../../../Utils/RouteWithSubRoutes";
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
            <Switch>
                {this.props.routes.map((route, index) => (
                    <RouteWithSubRoutes key={index} {...route} />
                ))}
            </Switch>
        );
    }
}

export default withRouter(Main);