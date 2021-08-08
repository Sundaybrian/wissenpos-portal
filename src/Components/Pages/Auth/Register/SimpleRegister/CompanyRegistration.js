import React, { Component } from "react";
import PropTypes from "prop-types";

import * as Yup from "yup";

import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";

//mui stuff
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createStyles } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";

// components
import Copyright from "../../../../Base/Copyright";

// redux
import { connect } from "react-redux";
import { registerCompany } from "../../../../../Redux/actions/companyActions";

const styles = createStyles((theme) => ({
    root: {
        height: "100vh",
        "& .MuiTextField-root": {
            margin: theme.spacing(1),
            // width: 200,
        },
    },
    image: {
        backgroundRepeat: "no-repeat",
        backgroundColor:
            theme.palette.type === "dark"
                ? theme.palette.grey[900]
                : theme.palette.grey[50],
        backgroundSize: "cover",
        backgroundPosition: "center",
        width: "100%",
        paddingTop: "40px",
    },
    paper: {
        margin: theme.spacing(8, 8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
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

class CompanyReg extends Component {
    constructor() {
        super();
        this.state = {
            owner_id: null,
        };
    }

    handleSubmit = (values, actions, user) => {
        const company = {
            ...values,
        };

        this.props.registerCompany(company, this.props.history);
        actions.resetForm();
    };

    render() {
        const {
            classes,
            auth: { user },
            ui: { loading },
        } = this.props;

        return (
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid container justify="center" className={classes.image}>
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={5}
                        component={Paper}
                        direction="row"
                        elevation={6}
                        square
                    >
                        <Grid className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Create Company
                            </Typography>

                            <Formik
                                initialValues={{
                                    name: "",
                                    description: "",
                                    email: "",
                                    logo_url: "",
                                    website_url: "",
                                }}
                                validationSchema={validationSchema}
                                onSubmit={(values, actions) =>
                                    this.handleSubmit(values, actions, user)
                                }
                            >
                                <Form>
                                    <Field
                                        name="name"
                                        type="text"
                                        label="Company Name"
                                        variant="outlined"
                                        component={TextField}
                                        fullWidth
                                    />

                                    <Field
                                        name="description"
                                        type="text"
                                        label="Company Description"
                                        variant="outlined"
                                        component={TextField}
                                        fullWidth
                                    />

                                    <Field
                                        name="website_url"
                                        type="text"
                                        label="Company Website"
                                        variant="outlined"
                                        component={TextField}
                                        fullWidth
                                    />

                                    <Field
                                        variant="outlined"
                                        component={TextField}
                                        fullWidth
                                        label="CompanyEmail Address"
                                        name="email"
                                        autoComplete="companyEmail"
                                        autoFocus
                                    />
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        disabled={loading}
                                        className={classes.submit}
                                        type="submit"
                                    >
                                        Create Company
                                        {loading && (
                                            <CircularProgress
                                                size={30}
                                                className={classes.progress}
                                            />
                                        )}
                                    </Button>
                                </Form>
                            </Formik>

                            <Grid container mt={5}>
                                <Grid item xs>
                                    <Link to="/login" variant="body2">
                                        Forgot password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="/login" variant="body2">
                                        {"Already have an account? Log in"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

CompanyReg.propTypes = {
    classes: PropTypes.object.isRequired,
    registerCompany: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    ui: state.ui,
});

const mapActionsToProps = {
    registerCompany,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(CompanyReg));
