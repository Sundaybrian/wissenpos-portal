import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// form stuff
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = makeStyles(theme => ({
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

const validationSchema = Yup.object({
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

function StaffCreate(props) {
  const classes = styles();
  const { handleClose, handleCreateStaff, loading, company } = props;
  /* eslint-disable no-unused-vars */

  const createStaff = (values, action) => {
    const staff = {
      user: {
        ...values,
        role: 'staff',
      },
      company_id: company[0].id,
    };

    handleCreateStaff({ staffData: staff, closeModal: handleClose });
  };

  return (
    <Formik
      initialValues={{
        firstName: 'dol',
        lastName: 'cample',
        email: 'dol@gmail.com',
        phoneNumber: '7143823667',
        password: 'S@leysha2013',
        confirmPassword: 'S@leysha2013',
      }}
      validationSchema={validationSchema}
      onSubmit={createStaff}
    >
      <Form>
        <Field name="firstName" type="text" label="First Name" variant="outlined" component={TextField} fullWidth />

        <Field name="lastName" type="text" label="Last Name" variant="outlined" component={TextField} fullWidth />

        <Field name="phoneNumber" type="text" label="PhoneNumber" variant="outlined" component={TextField} fullWidth />

        <Field
          variant="outlined"
          component={TextField}
          fullWidth
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />

        <Field variant="outlined" type="password" component={TextField} fullWidth label="Password" name="password" />

        <Field
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          component={TextField}
          variant="outlined"
          fullWidth
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          disabled={loading}
          className={classes.submit}
          type="submit"
        >
          Create Account
          {loading && <CircularProgress size={30} className={classes.progress} />}
        </Button>

        <Button
          variant="contained"
          color="secondary"
          size="medium"
          onClick={handleClose}
          style={{
            marginLeft: '10px',
          }}
        >
          Cancel
        </Button>
      </Form>
    </Formik>
  );
}

const mapActionsToProps = {};

const mapStateToProps = state => {
  return {
    loading: state.ui.loading,
    company: state.company.company,
  };
};

StaffCreate.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(StaffCreate);
