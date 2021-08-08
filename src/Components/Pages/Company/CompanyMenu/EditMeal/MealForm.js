import Button from '@material-ui/core/Button';
import { clearCurrentMeal } from '../../../../../Redux/actions/menuActions';
import { connect } from 'react-redux';
// form stuff
import * as Yup from 'yup';
import { Formik, Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import { Grid, makeStyles } from '@material-ui/core';
import ProgressBar from './ProgressBar';
import UploadButton from './uploadButton';

const useStyles = makeStyles(theme => ({
  form: {
    padding: theme.spacing(3),
    '& .MuiFormControl-root': {
      marginBottom: theme.spacing(3.5),
    },
  },
}));

const validationSchema = Yup.object({
  name: Yup.string().required('category name is required'),
  price: Yup.number('please enter a number eg 200').required('price is required'),
  description: Yup.string().max(200, 'should not exceed 200 characters').required('description is required'),
  quantity: Yup.number().required('please fill current available stock'),
  // image_url: Yup.string().required("please upload a picture"),
});

const initialValues = {
  name: '',
  price: 0,
  description: '',
  quantity: 0,
};

function MealForm(props) {
  const classes = useStyles();

  const {
    //from redux
    clearCurrentMeal,
    handleMealSubmit,
    handleMealEdit,
    setAddMeal,
    currentMeal,
    setToogleMenuView,
    // image upload
    file,
    setFile,
    imageChangeHandler,
    setImageUrl,
  } = props;

  const onKeyUpText = e => {
    // customing handler for getting from changes to update meal preview
    setAddMeal(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setToogleMenuView(true);
  };

  return (
    <Formik
      initialValues={
        currentMeal
          ? {
              name: currentMeal.name,
              price: currentMeal.price,
              description: currentMeal.description,
              quantity: currentMeal.quantity,
            }
          : initialValues
      }
      validationSchema={validationSchema}
      onSubmit={currentMeal ? handleMealEdit : handleMealSubmit}
    >
      {({ handleChange }) => (
        <Form className={classes.form}>
          <Grid container spacing={5}>
            <Grid item xs={12}>
              <Field
                name="name"
                type="text"
                label="meal name"
                component={TextField}
                fullWidth
                onChange={e => {
                  handleChange(e);
                  onKeyUpText(e);
                }}
              />
              <Field
                name="price"
                type="number"
                label="Price"
                component={TextField}
                onChange={e => {
                  handleChange(e);
                  onKeyUpText(e);
                }}
                fullWidth
              />
              <Field
                name="description"
                type="text"
                label="Description"
                component={TextField}
                onChange={e => {
                  handleChange(e);
                  onKeyUpText(e);
                }}
                fullWidth
              />
              <Field
                name="quantity"
                type="number"
                label="Quantity"
                component={TextField}
                onChange={e => {
                  handleChange(e);
                  onKeyUpText(e);
                }}
                fullWidth
              />

              {file == null && <UploadButton imageChangeHandler={imageChangeHandler} currentMeal={currentMeal} />}

              {file && (
                <Grid item xs={12}>
                  <ProgressBar file={file} setFile={setFile} setImageUrl={setImageUrl} setAddMeal={setAddMeal} />
                </Grid>
              )}
            </Grid>
            <Grid item xs={8}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                style={{
                  marginRight: '12px',
                }}
              >
                Ok
              </Button>
              <Button
                variant="secondary"
                color="primary"
                onClick={() => {
                  clearCurrentMeal();
                  setAddMeal(null);
                  setToogleMenuView(false);
                }}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
}

const mapActionsToProps = {
  clearCurrentMeal,
};

export default connect(null, mapActionsToProps)(MealForm);
