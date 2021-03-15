import React, { useState } from "react";
// components
import Main from "./Main";
import { BrowserRouter, withRouter } from "react-router-dom";
import AppBarAndDrawer from "../../Layout/AppBarAndDrawer/AppBarAndDrawer";
import { ThemeProvider } from "@material-ui/core/styles";
import { useTheme } from "../../../theme";
// helpers
import getDashboardRoutes from "./helpers";

//redux
import { connect } from "react-redux";

function Dashboard(props) {
    const [currentTheme, setCurrentTheme] = useTheme();

    //get user role
    const {
        user: { role },
    } = props;

    return (
        <ThemeProvider theme={currentTheme}>
            <AppBarAndDrawer
                currentTheme={currentTheme}
                setCurrentTheme={setCurrentTheme}
                routes={getDashboardRoutes(role)}
            />

            <Main routes={getDashboardRoutes(role)} />

            {/* main app will be here */}
        </ThemeProvider>
    );
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(Dashboard);
