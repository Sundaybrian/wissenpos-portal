import React, { Component } from "react";
import { Route } from "react-router-dom";

export class Main extends Component {
    constructor(props) {
        super(props);
    }

    goHome = () => {
        // redirect to menus pages
        this.props.history.push(
            `${this.props.matchPath}/${this.props.routes[2].path}`
        );
    };

    componentDidMount() {
        this.goHome();
    }

    render() {
        const { matchPath, routes } = this.props;
        return (
            <Route
                path={`${matchPath}/:id`} // equivalent /dashboard/menu menu is the dynamic part
                render={(props) => {
                    let page = routes.find((p) => {
                        return p.text === props.match.params.id;
                    });

                    return (
                        <page.component
                            routes={page.routes !== null ? goToPage.routes : []}
                            {...props}
                        />
                    );
                }}
            />
        );
    }
}

export default withRouter(Main);
