import React from "react";
// components
import AppBarAndDrawer from "../../layout/AppBarAndDrawer/AppBarAndDrawer";
import { ThemeProvider } from "@material-ui/core/styles";
import { useTheme } from "../../../theme";

function Dashboard() {
    const [currentTheme, setCurrentTheme] = useTheme();
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
