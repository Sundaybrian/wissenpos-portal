import React, { Component } from "react";
import PropTypes from "prop-types";
import Appicon from "../../../images/logo.png";
import { Link } from "react-router-dom";

// MUi stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typograpgy from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// redux
import { connect } from "react-redux";
import { loginUser } from "../../../redux/actions/authActions";

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

export class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            errors: {},
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.ui.errors) {
            this.setState({ errors: nextProps.ui.errors });
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            email: this.state.email,
            password: this.state.password,
        };

        this.props.loginUser(userData, this.props.history);
    };

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        });
    };

    render() {
        const {
            classes,
            ui: { loading },
        } = this.props;
        const { errors } = this.state;

        return (
            <Grid container className={classes.form}>
                <Grid item sm />
                <Grid item sm>
                    <img
                        src={Appicon}
                        alt="wissensof logo"
                        className={classes.pageIcon}
                    />
                    <Typograpgy variant="h2" className={classes.pageTitle}>
                        Login
                    </Typograpgy>
                    <form noValidate onSubmit={this.handleSubmit}>
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
                            fullWidth
                            required
                        />
                        <TextField
                            id="password"
                            name="password"
                            type="password"
                            label="Password"
                            helperText={errors.message}
                            error={errors.message ? true : false}
                            className={classes.textField}
                            value={this.state.password}
                            onChange={this.handleChange}
                            fullWidth
                            required
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            disabled={loading}
                        >
                            Login
                            {loading && (
                                <CircularProgress
                                    size={30}
                                    className={classes.progress}
                                />
                            )}
                        </Button>
                        <br />
                        <small>
                            dont have an account ? sign up{" "}
                            <Link to="/register">here</Link>
                        </small>
                    </form>
                </Grid>
                <Grid item sm />
            </Grid>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    ui: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    ui: state.ui,
});

const mapActionsToProps = {
    loginUser,
};

export default connect(
    mapStateToProps,
    mapActionsToProps
)(withStyles(styles)(Login));
