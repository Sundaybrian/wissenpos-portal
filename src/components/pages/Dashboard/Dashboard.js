import React, { useEffect, useState } from "react";
// components
import AppBarAndDrawer from "../../layout/AppBarAndDrawer/AppBarAndDrawer";
import { ThemeProvider } from "@material-ui/core/styles";
import { useTheme } from "../../../theme";
//
// import {} from

function Dashboard() {
    const [currentTheme, setCurrentTheme] = useTheme();
    const [routes, setRoutess] = useState([]);

    useEffect(() => {}, []);

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

export default Dashboard;
