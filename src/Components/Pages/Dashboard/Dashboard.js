import React, { useState } from "react";
// components
import Main from "./Main";

import AppBarAndDrawer from "../../Layout/AppBarAndDrawer/AppBarAndDrawer";

// helpers
import getDashboardRoutes from "./helpers";

//redux
import { connect } from "react-redux";

function Dashboard(props) {
    const {
        user: { role },
        match: { path },
        currentTheme,
        setCurrentTheme,
    } = props;

    return (
        <>
            <AppBarAndDrawer
                currentTheme={currentTheme}
                setCurrentTheme={setCurrentTheme}
                routes={getDashboardRoutes(role)}
                matchPath={path}
            />

            <Main routes={getDashboardRoutes(role)} matchPath={path} />
        </>
    );
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(Dashboard);
