import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Controls from "../../../Controls";
import CloseIcon from "@material-ui/icons/Close";
// form stuff
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import { Grid, Typography, makeStyles } from "@material-ui/core";

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

export default function MealForm(props) {
    const { handleMealSubmit } = props;
    return (
        <Formik
            initialValues={{
                name: "",
                price: 0,
                description: "",
                quantity: 0,
                image_url:
                    "https://i2.wp.com/kaneskitchenaffair.com/wp-content/uploads/2019/05/img_7122.jpg?resize=1200%2C751",
            }}
            validationSchema={validationSchema}
            onSubmit={handleMealSubmit}
        >
            <Form>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Field
                            name="name"
                            type="text"
                            label="category name"
                            component={TextField}
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
                    </Grid>
                </Grid>
            </Form>
        </Formik>
    );
}
