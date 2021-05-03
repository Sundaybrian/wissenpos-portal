import { useState } from "react";
import { createMuiTheme } from "@material-ui/core/styles";

const defaultTheme = {
    palette: {
        primary: {
            light: "#3a4450",
            main: "#131d28",
            dark: "#0b1218",
            contrastText: "#fff",
        },
        secondary: {
            light: "#ffc947",
            main: "#ff9800",
            dark: "#c66900",
            contrastText: "#000",
        }, //ss,
        //type: "dark",
    },
    typography: {
        fontFamily: "'Roboto','san-serif', cursive;",
    },
    status: {
        danger: "orange",
    },
};

export function useTheme() {
    const [currentTheme, setCurrentTheme] = useState({
        palette: {
            primary: {
                light: "#3a4450",
                main: "#131d28",
                dark: "#0b1218",
                contrastText: "#fff",
            },
            secondary: {
                light: "#ffc947",
                main: "#ff9800",
                dark: "#c66900",
                contrastText: "#000",
            },
        },
    });
    const muiTheme = createMuiTheme({
        ...defaultTheme,
        ...currentTheme,
    });
    return [muiTheme, setCurrentTheme];
}
