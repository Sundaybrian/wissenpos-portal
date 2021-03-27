import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Button, CircularProgress, Grid } from "@material-ui/core";
import Loader from "../../../Base/Loader";
import { registerCompany } from "../../../../Redux/actions/companyActions";
import { connect } from "react-redux";

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
        .email("Invalid email address")
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
    const {
        registerCompany,
        ui: { loading },
    } = props;
    const classes = useStyles();

    const handleSubmit = (values, actions) => {
        const companyData = {
            ...values,
        };

        registerCompany(companyData, props.history);
        actions.resetForm();
    };

    if (loading) {
        <Loader />;
    }
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

                        <Grid item xs={6}>
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

                            <div className={classes.actionButtons}>
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

                                {/* <Button
                                            variant="contained"
                                            color="default"
                                            disabled={loading}
                                            className={classes.submit}
                                            
                                        >
                                            Reset
                                        </Button> */}
                            </div>
                        </Grid>
                    </Grid>
                </Form>
            )}
        </Formik>
    );
}

const mapStateToProps = (state) => ({
    ui: state.ui,
});

const mapActionsToProps = {
    registerCompany,
};

export default connect(mapStateToProps, mapActionsToProps)(CompanyForm);
