import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Link } from "react-router-dom";
import AppIcon from "../../../images/logo.png";

//MuI stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
    form: {
        textAlign: "center",
    },
    pageTitle: {
        margin: "10px auto 10px auto",
    },
    pageIcon: {
        margin: "20px auto 20px auto",
        height: "65px",
    },
    textField: {
        margin: "10px auto 10px auto",
    },
    button: {
        marginTop: 20,
        position: "relative",
    },
    progress: {
        position: "absolute",
    },
};

class Register extends Component {
    constructor() {
        super();
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
            role: "owner",
            loading: false,
            errors: {},
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            loading: true,
        });

        if (this.state.password !== this.state.confirmPassword) {
            // raise form error for the fields
            // return
        }

        axios
            .post("/accounts/register-owner", this.state.user)
            .then((res) => {
                localStorage.setItem("token", `Bearer ${res.data.token}`);
                this.setState({
                    loading: false,
                });

                this.props.history.push("/dashboard");
            })
            .catch((err) => {
                this.setState({
                    errors: err.response.data,
                    loading: false,
                });
            });
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid sm={2} />
                <Grid item sm={8}>
                    <img
                        src={AppIcon}
                        alt="wissenspos logo"
                        className={classes.pageIcon}
                    />
                    <Typography variant="h2" className={classes.pageTitle}>
                        Register
                    </Typography>
                    <form onSubmit={this.handleSubmit}>
                        <TextField
                            id="firstName"
                            name="firstName"
                            type="text"
                            label="First Name"
                            helperText={errors.message}
                            error={errors.message ? true : false}
                            className={classes.textField}
                            value={this.state.firstName}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
                        <TextField
                            id="lastName"
                            name="lastName"
                            type="text"
                            label="Last Name"
                            helperText={errors.message}
                            error={errors.message ? true : false}
                            className={classes.textField}
                            value={this.state.lastName}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
                        <TextField
                            id="email"
                            name="email"
                            type="email"
                            label="Email"
                            helperText={errors.message}
                            error={errors.message ? true : false}
                            className={classes.textField}
                            value={this.state.email}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
                        <TextField
                            id="pasword"
                            name="pasword"
                            type="password"
                            inputProps={{ minLength: 8 }}
                            label="Password"
                            helperText={errors.message}
                            error={errors.message ? true : false}
                            className={classes.textField}
                            value={this.state.password}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
                        <TextField
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            label="PhoneNumber"
                            inputProps={{ minLength: 10, maxLength: 15 }}
                            helperText={errors.message}
                            error={errors.message ? true : false}
                            className={classes.textField}
                            value={this.state.phoneNumber}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />
                        <TextField
                            id="confirmPasword"
                            name="confirmPasword"
                            type="password"
                            label="Confirm Password"
                            inputProps={{ minLength: 8 }}
                            helperText={errors.message}
                            error={errors.message ? true : false}
                            className={classes.textField}
                            value={this.state.confirmPassword}
                            onChange={this.handleChange}
                            variant="outlined"
                            fullWidth
                            required
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            endIcon={loading && <CircularProgress size={30} />}
                            disabled={loading}
                        >
                            Register
                        </Button>
                        <br />
                        <small>
                            Already have an account ? login{" "}
                            <Link to="/login">here</Link>
                        </small>
                    </form>
                </Grid>
                <Grid sm />
            </Grid>
        );
    }
}

Register.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Register);
