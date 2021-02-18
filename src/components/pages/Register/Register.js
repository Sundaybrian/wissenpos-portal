import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link as RouterLink } from "react-router-dom";

//mui stuff
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { createStyles } from "@material-ui/core/styles";
import withStyles from "@material-ui/core/styles/withStyles";

// redux
import { connect } from "react-redux";
import { registerUser } from "../../../redux/actions/authActions";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            <Link color="inherit" href="https://wissensof.com/">
                Wissenpos
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const styles = createStyles((theme) => ({
    root: {
        height: "100vh",
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

class Register extends Component {
    constructor() {
        super();
        this.state = {
            user: {
                firstName: "",
                lastName: "",
                email: "",
                phoneNumber: "",
                password: "",
                confirmPassword: "",
                role: "owner",
            },
            loading: false,
            errors: {},
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();

        if (this.state.user.password !== this.state.user.confirmPassword) {
            // raise form error for the fields
            // return
            this.setState({
                errors: "Passwords must match",
            });

            return false;
        }

        this.props.registerUser(this.state.user, this.props.history);
    };

    handleChange = (e) => {
        this.setState({
            user: { ...this.state.user, [e.target.name]: e.target.value },
        });
    };

    render() {
        const {
            classes,
            ui: { loading },
        } = this.props;
        const { errors } = this.state;

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
                        // direction="row"
                        elevation={6}
                        square
                    >
                        <Grid className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                            <Typography component="h1" variant="h5">
                                Register
                            </Typography>
                            <form
                                className={classes.form}
                                noValidate
                                onSubmit={this.handleSubmit}
                            >
                                <TextField
                                    id="firstName"
                                    margin="normal"
                                    name="firstName"
                                    type="text"
                                    label="First Name"
                                    helperText={errors.message}
                                    error={errors.message ? true : false}
                                    value={this.state.user.firstName}
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                />

                                <TextField
                                    id="lastName"
                                    margin="normal"
                                    name="lastName"
                                    type="text"
                                    label="Last Name"
                                    helperText={errors.message}
                                    error={errors.message ? true : false}
                                    value={this.state.user.lastName}
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                />

                                <TextField
                                    id="phoneNumber"
                                    margin="normal"
                                    name="phoneNumber"
                                    type="text"
                                    label="PhoneNumber"
                                    inputProps={{
                                        minLength: 10,
                                        maxLength: 15,
                                    }}
                                    helperText={errors.message}
                                    error={errors.message ? true : false}
                                    value={this.state.user.phoneNumber}
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                />

                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    value={this.state.user.email}
                                    onChange={this.handleChange}
                                    helperText={errors.message}
                                    autoComplete="email"
                                    autoFocus
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    inputProps={{ minLength: 8 }}
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    helperText={errors.message}
                                    error={errors.message ? true : false}
                                    value={this.state.user.password}
                                    onChange={this.handleChange}
                                />

                                <TextField
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type="password"
                                    label="Confirm Password"
                                    inputProps={{ minLength: 8 }}
                                    helperText={errors.message}
                                    error={errors.message ? true : false}
                                    value={this.state.user.confirmPassword}
                                    onChange={this.handleChange}
                                    variant="outlined"
                                    fullWidth
                                    required
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            value="remember"
                                            color="primary"
                                        />
                                    }
                                    label="Remember me"
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={loading}
                                    className={classes.submit}
                                    type="submit"
                                >
                                    Register
                                    {loading && (
                                        <CircularProgress
                                            size={30}
                                            className={classes.progress}
                                        />
                                    )}
                                </Button>
                                <Grid container>
                                    <Grid item xs>
                                        <Link href="#" variant="body2">
                                            Forgot password?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link href="/login" variant="body2">
                                            {"Already have an account? Log in"}
                                        </Link>
                                    </Grid>
                                </Grid>
                                <Box mt={5}>
                                    <Copyright />
                                </Box>
                            </form>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    ui: state.ui,
});

const mapActionsToProps = {
    registerUser,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(Register));
