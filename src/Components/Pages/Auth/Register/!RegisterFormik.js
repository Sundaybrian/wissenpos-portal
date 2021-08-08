import React, { Component, useState } from 'react';
import PropTypes from 'prop-types';

import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';

// formik stuff
import { Field } from 'formik';
import { CheckboxWithLabel, TextField } from 'formik-material-ui';

//mui stuff

import { Step, StepLabel, Stepper } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';

import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles } from '@material-ui/core/styles';
import withStyles from '@material-ui/core/styles/withStyles';

// components
import Copyright from '../../../Base/Copyright';

import { FormikStepper, FormikStep } from './RegisterWizard/FormikStepper';
// redux
import { connect } from 'react-redux';
import { registerUser } from '../../../../Redux/actions/authActions';

const styles = createStyles(theme => ({
  root: {
    height: '100vh',
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundColor: theme.palette.type === 'dark' ? theme.palette.grey[900] : theme.palette.grey[50],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100%',
    paddingTop: '40px',
  },
  paper: {
    margin: theme.spacing(8, 8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  progress: {
    position: 'absolute',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const validationSchemaOwner = Yup.object({
  firstName: Yup.string().required('firstName is required'),
  lastName: Yup.string().required('lastNaame is required'),
  phoneNumber: Yup.string()
    .min(10, 'must be atleast 10 characters')
    .max(15, 'must not exceed 15 characters')
    .required(' Phone Number is required'),
  email: Yup.string().email('invalid email address').required(),
  password: Yup.string()
    .min(8)
    .max(200)
    .matches(/[^A-Za-z0-9]/, 'password must contain a special character')
    .matches(/[A-Z]/, 'password must contain an uppercase letter')
    .matches(/[a-z]/, 'password must contain a lowercase letter')
    .matches(/[0-9]/, 'password must contain a number')
    .required(),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
});

const validationSchemaCompany = Yup.object({
  companyName: Yup.string().required('companyName is required'),
  companyDescription: Yup.string()
    .max(200, 'must not exceed 200 characters')
    .required('company description is required'),
  companyWebsite: Yup.string().max(200, 'must not exceed 15 characters'),
  companyEmail: Yup.string().email('invalid companyEmail address').required(),
});

class Register extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
        confirmPassword: '',
        role: 'owner',
      },
      loading: false,
      errors: {},
      owner_id: null,
    };
  }

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.user.password !== this.state.user.confirmPassword) {
      // raise form error for the fields
      // return
      this.setState({
        errors: 'Passwords must match',
      });

      return false;
    }

    this.props.registerUser(this.state.user, this.props.history);
  };

  handleChange = e => {
    this.setState({
      user: { ...this.state.user, [e.target.name]: e.target.value },
    });
  };

  render() {
    const {
      classes,
      ui: { loading, errors },
    } = this.props;

    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid container justify="center" className={classes.image}>
          <Grid item xs={12} sm={8} md={5} component={Paper} direction="row" elevation={6} square>
            <Grid className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Company Register
              </Typography>
              <FormikStepper
                initialValues={{
                  firstName: '',
                  lastName: '',
                  email: '',
                  phoneNumber: '',
                  password: '',
                  confirmPassword: '',
                  role: 'owner',
                  companyName: '',
                  companyEmail: '',
                  companyDescription: '',
                  companyWebsite: '',
                }}
                onSubmit={() => {}}
              >
                <FormikStep label="personal details" validationSchema={validationSchemaOwner}>
                  <Field
                    name="firstName"
                    type="text"
                    label="First Name"
                    variant="outlined"
                    component={TextField}
                    fullWidth
                  />

                  <Field
                    name="lastName"
                    type="text"
                    label="Last Name"
                    variant="outlined"
                    component={TextField}
                    fullWidth
                  />

                  <Field
                    name="phoneNumber"
                    type="text"
                    label="PhoneNumber"
                    variant="outlined"
                    component={TextField}
                    fullWidth
                  />

                  <Field
                    variant="outlined"
                    component={TextField}
                    fullWidth
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />

                  <Field
                    variant="outlined"
                    type="password"
                    component={TextField}
                    fullWidth
                    label="Password"
                    name="password"
                  />

                  <Field
                    name="confirmPassword"
                    type="password"
                    label="Confirm Password"
                    component={TextField}
                    variant="outlined"
                    fullWidth
                  />
                </FormikStep>

                <FormikStep label="company details" validationSchema={validationSchemaCompany}>
                  <Field
                    name="companyName"
                    type="text"
                    label="Company Name"
                    variant="outlined"
                    component={TextField}
                    fullWidth
                  />

                  <Field
                    name="companyDescription"
                    type="text"
                    label="Company Website"
                    variant="outlined"
                    component={TextField}
                    fullWidth
                  />

                  <Field
                    name="companyWebsite"
                    type="text"
                    label="Company Website"
                    variant="outlined"
                    component={TextField}
                    fullWidth
                    required
                  />

                  <Field
                    variant="outlined"
                    component={TextField}
                    fullWidth
                    label="CompanyEmail Address"
                    name="companyEmail"
                    autoComplete="companyEmail"
                    autoFocus
                  />
                </FormikStep>
                <Grid container mt={5}>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/login" variant="body2">
                      {'Already have an account? Log in'}
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                  <Copyright />
                </Box>
              </FormikStepper>
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

const mapStateToProps = state => ({
  auth: state.auth,
  ui: state.ui,
});

const mapActionsToProps = {
  registerUser,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Register));
