import React from "react";

import * as Yup from "yup";

import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";

const validationSchema = Yup.object({
    name: Yup.string().required("companyName is required"),
    description: Yup.string()
        .max(400, "must not exceed 400 characters")
        .required("company description is required"),
    logo_url: Yup.string().max(
        255,
        "url cannot be greater than 255 characters"
    ),
    website_url: Yup.string().max(
        255,
        "url cannot be greater than 255 characters"
    ),
    email: Yup.string()
        .email()
        .max(255, "email cannot be greater than 255 characters"),
});

const useStyles = makeStyles((theme) => ({
    root: {
        "& .MuiFormControl-root": {
            width: "80%",
            margin: theme.spacing(1),
        },
    },

    submit: {
        margin: theme.spacing(0.5),
    },
    actionButtons: {
        marginTop: theme.spacing(1.5),
    },
}));

function CompanyForm(props) {
    const {} = props;
    const classes = useStyles();

    const handleSubmit = (values, actions) => {};

    return (
        <Formik
            initialValues={{
                name: "",
                description: "",
                email: "",
                logo_url: "",
                website_url: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ values, errors, isSubmitting }) => (
                <Form className={classes.root}>
                    <Grid container>
                        <Grid item xs={6}>
                            <Field
                                name="name"
                                type="text"
                                label="Company Title"
                                variant="outlined"
                                component={TextField}
                            />

                            <Field
                                name="email"
                                type="email"
                                label="Company Email"
                                variant="outlined"
                                component={TextField}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <Field
                                name="website_url"
                                component={TextField}
                                label="Company Website"
                                variant="outlined"
                                fullWidth
                            />
                            <Field
                                name="logo_url"
                                component={TextField}
                                label="Company Logo"
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Field
                                name="description"
                                as="textarea"
                                label="Company Description"
                                variant="outlined"
                                component={TextField}
                                multiline
                                rowsMax={4}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

export default CompanyForm;
