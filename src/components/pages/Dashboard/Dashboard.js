import React, { useEffect, useState } from "react";
// components
import AppBarAndDrawer from "../../layout/AppBarAndDrawer/AppBarAndDrawer";
import { ThemeProvider } from "@material-ui/core/styles";
import { useTheme } from "../../../theme";
// helpers
import getDashboardRoutes from "./helpers";

//redux
import { connect } from "react-redux";

function Dashboard(props) {
    const [currentTheme, setCurrentTheme] = useTheme();
    const [routes, setRoutes] = useState([]);

    //get user role
    const {
        user: { role },
    } = props;

    useEffect(() => {
        // fetching user routes based on role
        const routesResponse = getDashboardRoutes(role);
        setRoutes(routesResponse);
    }, []);

    return (
        <>
            <ThemeProvider theme={currentTheme}>
                {routes !== null && routes.length !== 0 ? (
                    <AppBarAndDrawer
                        currentTheme={currentTheme}
                        setCurrentTheme={setCurrentTheme}
                        routes={routes}
                    />
                ) : (
                    <p>{routes}</p>
                )}
                {/* main app will be here */}
            </ThemeProvider>
        </>
    );
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(Dashboard);
