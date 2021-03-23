import React, { useState } from "react";
// components
import Main from "./Main";

import AppBarAndDrawer from "../../Layout/AppBarAndDrawer/AppBarAndDrawer";

// helpers
import getDashboardRoutes from "./helpers";

//redux
import { connect } from "react-redux";
import { ThemeProvider } from "@material-ui/styles";
import { makeStyles } from "@material-ui/core/styles";
import { useTheme } from "../../../Theme/theme";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
}));

function Dashboard(props) {
    const [currentTheme, setCurrentTheme] = useTheme();
    const {
        user: { role },
        match: { path },
        location,
    } = props;

    const classes = useStyles();

    return (
        <d>
            <ThemeProvider theme={currentTheme}>
                <AppBarAndDrawer
                    currentTheme={currentTheme}
                    setCurrentTheme={setCurrentTheme}
                    routes={getDashboardRoutes(role)}
                    matchPath={path}
                />

                <Main
                    routes={getDashboardRoutes(role)}
                    matchPath={path}
                    {...props}
                />
            </ThemeProvider>
        </d>
    );
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(Dashboard);
