import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import ImageIcon from "@material-ui/icons/Image";

// form stuff
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import { Grid, Typography, makeStyles } from "@material-ui/core";
import ProgressBar from "../../../../Base/ProgressBar";

const useStyles = makeStyles((theme) => ({
    form: {
        padding: theme.spacing(3),
        "& .MuiFormControl-root": {
            marginBottom: theme.spacing(3.5),
        },
    },
}));

const validationSchema = Yup.object({
    name: Yup.string().required("category name is required"),
    price: Yup.number("please enter a number eg 200").required(
        "price is required"
    ),
    description: Yup.string()
        .max(200, "should not exceed 200 characters")
        .required("description is required"),
    quantity: Yup.number().required("please fill current available stock"),
    image_url: Yup.string().required("please upload a picture"),
});

const initialValues = {
    name: "",
    price: 0,
    description: "",
    quantity: 0,
    image_url:
        "https://i2.wp.com/kaneskitchenaffair.com/wp-content/uploads/2019/05/img_7122.jpg?resize=1200%2C751",
};

export default function MealForm(props) {
    const classes = useStyles();

    const {
        handleMealSubmit,
        handleMealEdit,
        setAddMeal,
        currentMeal,
        setToogleMenuView,
    } = props;

    const onKeyUpText = (e) => {
        // customing handler for getting onChange value for previes
        setAddMeal((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
        setToogleMenuView(true);
    };

    const [file, setFile] = React.useState(null);
    const types = ["image/png", "image/jpeg", "image/jpg"];
    const changeHandler = (e) => {
        let selected = e.target.files[0];
        if (selected && types.includes(selected.type)) {
            setFile(selected);
            console.log(selected);
            // clearError
        } else {
            setFile(null);
            // setALertError e,g select an image file (png or jpeg)
        }
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
                          image_url: currentMeal.image_url,
                      }
                    : initialValues
            }
            validationSchema={validationSchema}
            onSubmit={currentMeal ? handleMealEdit : handleMealSubmit}
        >
            {({ handleChange }) => (
                <Form className={classes.form}>
                    <Grid container spacing={5}>
                        {file && (
                            <Grid item xs={12}>
                                <ProgressBar file={file} setFile={setFile} />
                            </Grid>
                        )}
                        <Grid item xs={12}>
                            <Field
                                name="name"
                                type="text"
                                label="meal name"
                                component={TextField}
                                fullWidth
                                onChange={(e) => {
                                    handleChange(e);
                                    onKeyUpText(e);
                                }}
                            />
                            <Field
                                name="price"
                                type="number"
                                label="Price"
                                component={TextField}
                                onChange={(e) => {
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
                                onChange={(e) => {
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
                                onChange={(e) => {
                                    handleChange(e);
                                    onKeyUpText(e);
                                }}
                                fullWidth
                            />
                            <Field
                                name="image_url"
                                type="text"
                                label="Upload Image"
                                component={TextField}
                                onChange={(e) => {
                                    handleChange(e);
                                    onKeyUpText(e);
                                }}
                                fullWidth
                            />
                            {/* new image file */}
                            <Field
                                name="image_url2"
                                type="file"
                                label="Add Image"
                                component={TextField}
                                onChange={(e) => {
                                    // handleChange(e);
                                    changeHandler(e);
                                }}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={8}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                            >
                                Ok
                            </Button>
                            <Button
                                variant="secondary"
                                color="primary"
                                onClick={() => {
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
