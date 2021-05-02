import React, { useState } from "react";
import PropTypes from "prop-types";
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
        authenticated,
        location,
    } = props;

    const classes = useStyles();

    return (
        <div className={classes.root}>
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
                    authenticated={authenticated}
                    {...props}
                />
            </ThemeProvider>
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
    authenticated: state.auth.authenticated,
});

Dashboard.propTypes = {
    user: PropTypes.object.isRequired,
    authenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(Dashboard);
