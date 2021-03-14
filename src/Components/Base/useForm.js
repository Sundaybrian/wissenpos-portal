import React, { useState } from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const styles = makeStyles(() => ({
    root: {
        "& .MuiFormControl-root": {
            width: "80%",
            margin: theme.spacing(1),
        },
    },
}));

export function Form(props) {
    const classes = styles();

    return <form className={classes.root}>{props.children}</form>;
}

function useForm(initialState) {
    const [value, setValue] = useState(initialState);

    const handleInputChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value,
        });
    };

    return {
        value,
        setValue,
        handleInputChange,
    };
}

export default useForm;
