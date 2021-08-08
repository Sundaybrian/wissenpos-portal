// redux
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// form stuff
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import * as Yup from 'yup';
import { editStaff } from '../../../../Redux/actions/staffManagementActions';
import makeStyles from '@material-ui/core/styles/makeStyles';
import { Grid } from '@material-ui/core';

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
});

function StaffEditForm(props) {
  /* eslint-disable no-unused-vars */
  const classes = styles();
  const {
    closeModal,
    handleClose, //passed by peopleModal via react.clone
    editStaff,
    loading,
    record: {
      company_id,
      staff_id,
      user: { firstName, lastName, role, active, image_url, phoneNumber, id: user_id, email, isVerified },
    },
  } = props;

  const editCurrentStaff = (values, action) => {
    const staff = {
      ...values,
    };
    editStaff({ staff, closeModal, handleClose, user_id });
  };

  return (
    <Formik
      initialValues={{
        firstName,
        lastName,
        email,
        phoneNumber,
      }}
      validationSchema={validationSchema}
      onSubmit={editCurrentStaff}
    >
      <Form>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Field name="firstName" type="text" label="First Name" variant="outlined" component={TextField} fullWidth />
          </Grid>

          <Grid item xs={12}>
            <Field name="lastName" type="text" label="Last Name" variant="outlined" component={TextField} fullWidth />
          </Grid>
          <Grid item xs={12}>
            <Field
              name="phoneNumber"
              type="text"
              label="PhoneNumber"
              variant="outlined"
              component={TextField}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Field
              variant="outlined"
              component={TextField}
              fullWidth
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
          </Grid>

          <Grid item xs={8}>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              disabled={loading}
              className={classes.submit}
              type="submit"
            >
              Ok
              {loading && <CircularProgress size={30} className={classes.progress} />}
            </Button>

            <Button
              variant="contained"
              color="secondary"
              size="medium"
              className={classes.submit}
              onClick={handleClose}
              style={{
                marginLeft: '10px',
              }}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
}

const mapStateToProps = state => {
  return {
    loading: state.ui.loading,
  };
};

const mapActionsToProps = {
  editStaff,
};

StaffEditForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  editStaff: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(StaffEditForm);
