import React from "react";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
// import { CircularProgress, Button, Grid } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Button, CircularProgress, Grid } from "@material-ui/core";

const validationSchema = Yup.object({
    name: Yup.string().required("menu name is required"),
    description: Yup.string()

        .max(200, "must not exceed 200 characters")
        .required("menu description is required"),
    cover_url: Yup.string().max(200, "must not exceed 200 characters"),
});

const useStyles = makeStyles((theme) => ({
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    progress: {
        position: "absolute",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
function MenuForm(props) {
    const { handleMenuSubmit, loading } = props;
    const classes = useStyles();

    return (
        <Formik
            initialValues={{
                name: "",
                description: "",
                cover_url: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleMenuSubmit}
        >
            <Form className={classes.form}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Field
                            name="name"
                            type="text"
                            label="Menu Name"
                            component={TextField}
                            fullWidth
                        />
                        <Field
                            name="description"
                            type="text"
                            label="Menu Description"
                            component={TextField}
                            fullWidth
                        />
                        <Field
                            name="cover_url"
                            type="text"
                            label="Menu Cover"
                            component={TextField}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={8}>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            className={classes.submit}
                            type="submit"
                        >
                            Submit
                            {loading && (
                                <CircularProgress
                                    size={30}
                                    className={classes.progress}
                                />
                            )}
                        </Button>
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    );
}

export default MenuForm;
