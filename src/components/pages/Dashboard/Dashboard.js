import React, { useEffect, useState } from "react";
// components
import AppBarAndDrawer from "../../layout/AppBarAndDrawer/AppBarAndDrawer";
import { ThemeProvider } from "@material-ui/core/styles";
import { useTheme } from "../../../theme";
//redux
import { connect } from "react-redux";

function Dashboard(props) {
    const [currentTheme, setCurrentTheme] = useTheme();
    const [routes, setRoutess] = useState([]);

    //get user role
    const {
        user: { role },
    } = props;

    useEffect(() => {
        console.log(role, "========");
    }, []);

    return (
        <>
            <ThemeProvider theme={currentTheme}>
                <AppBarAndDrawer
                    currentTheme={currentTheme}
                    setCurrentTheme={setCurrentTheme}
                />
                {/* main app will be here */}
            </ThemeProvider>
        </>
    );
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(Dashboard);
