import React, { useEffect } from "react";
import useStorage from "../../Hooks/useStorage";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    progressBar: {
        height: "5px",
        background: theme.palette.primary,
        marginTop: "20px",
    },
}));

function ProgressBar(props) {
    const classes = useStyles();
    const { file, setFile } = props;
    const { url, progress } = useStorage(file);

    useEffect(() => {
        if (url) {
            setFile(null);
        }
    }, [url, setFile]);

    return (
        <div
            className={classes.progressBar}
            style={{ width: progress + "%" }}
        ></div>
    );
}

export default ProgressBar;
