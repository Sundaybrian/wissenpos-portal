import React, { Component } from "react";
import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom";

export class Main extends Component {
    constructor(props) {
        super(props);
    }

    goHome = () => {
        console.log(
            `${this.props.location.pathname}/${this.props.routes[0].path}`
        );

        console.log(`${this.props.match.path}/${this.props.routes[0].path}`);

        // /dashboard/metrics
        this.props.history.push({
            pathname: `${this.props.matchPath}/${this.props.routes[0].path}`,
        });

        // this.props.history.replaceState(
        //     null,
        //     null,
        //     `${this.props.matchPath}/${this.props.routes[0].path}`
        // );
    };

    componentDidMount() {
        this.goHome();
    }

    render() {
        const { matchPath, routes, location } = this.props;
        return (
            <Route
                path={`${matchPath.pathname}/:id`} // equivalent /dashboard/menu menu is the dynamic part
                render={(props) => {
                    let page = routes.find((p) => {
                        return p.text === props.match.params.id;
                    });

                    return (
                        <page.component
                            routes={page.routes !== null ? page.routes : []}
                            {...props}
                        />
                    );
                }}
            />
        );
    }
}

export default Main;
