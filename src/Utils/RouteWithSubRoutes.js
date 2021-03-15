import React from "react";
import { Route, withRouter, Redirect } from "react-router-dom";

function RouteWithSubRoutes(route) {
    const { component: Component } = route;
    console.log(route);
    return (
        <Route
            path={route.path}
            exact={route.exact}
            render={(props) => (
                <Component {...props} routes={route.routes} key={props.key} />
            )}
        />
    );
}

export const PrivateRouteWithSubRoutes = ({
    route,
    authenticated,
    ...rest
}) => {
    return (
        <Route
            {...rest}
            render={(props) =>
                !authenticated ? (
                    <Redirect to="/login" />
                ) : (
                    <route.component
                        {...props}
                        routes={route.routes}
                        key={props.key}
                    />
                )
            }
        />
    );
};

export default withRouter(RouteWithSubRoutes);
