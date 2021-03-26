import React, { useState } from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { blue, blueGrey, purple, pink } from "@material-ui/core/colors";

const defaultTheme = {
    palette: {
        primary: blue,
        secondary: pink, //ss,
        //type: "dark",
    },
    typography: {
        fontFamily: "'Roboto', cursive;",
    },
    status: {
        danger: "orange",
    },
};

export function useTheme() {
    const [currentTheme, setCurrentTheme] = useState({
        palette: {
            primary: blue,
            secondary: pink, //ss,
        },
    });
    const muiTheme = createMuiTheme({
        ...defaultTheme,
        ...currentTheme,
    });
    return [muiTheme, setCurrentTheme];
}
