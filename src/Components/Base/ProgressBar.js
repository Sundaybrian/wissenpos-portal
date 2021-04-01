import React from "react";
import useStorage from "../../Hooks/useStorage";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    progressBar: {},
}));

function ProgressBar(props) {
    const classes = useStyles();
    const { file, setFile } = props;
    const { url, progress } = useStorage(file);
    console.log(progress, url);
    return <div className={classes.progressBar}>{progress}</div>;
}

export default ProgressBar;
