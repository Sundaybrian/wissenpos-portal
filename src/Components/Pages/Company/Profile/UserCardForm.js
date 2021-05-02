import React from "react";
import PropTypes from "prop-types";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { CircularProgress, Button, Grid } from "@material-ui/core";
import * as Yup from "yup";
import UploadButton from "../../../Base/UploadButton";
import useImageHandler from "../../../../Hooks/useImageHandler";
import ProgressBar from "../../../Base/ProgressBarImages";

const useStyles = makeStyles((theme) => ({
    root: {
        // display: "flex",
        // maxWidth: 345,

        // color: theme.palette.text.secondary,
        "& .MuiFormControl-root": {
            margin: theme.spacing(3),
            width: 200,
        },
    },

    form: {
        // maxWidth: 345,
        width: "100%",
        // marginLeft: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& .MuiFormControl-root": {
            margin: theme.spacing(3),
            width: 2000,
        },
    },
    UploadButton: {
        margin: theme.spacing(1.5),
    },
    submit: {
        margin: theme.spacing(0.5),
    },
    actionButtons: {
        marginTop: theme.spacing(1.5),
        display: "flex",
        justifyContent: "center",
    },
}));

const validationSchema = Yup.object({
    firstName: Yup.string().required("firstName is required"),
    lastName: Yup.string().required("lastName is required"),
    phoneNumber: Yup.string()
        .min(10, "must be atleast 10 characters")
        .max(15, "must not exceed 15 characters")
        .required(" Phone Number is required"),
    email: Yup.string().email("invalid email address").required(),
});

function UserCardForm(props) {
    const { handleUserUpdate, setEditUser, user, loading } = props;
    const classes = useStyles();

    const handleCancel = () => {
        setEditUser(false);
    };

    const {
        file,
        setFile,
        imageUrl,
        setImageUrl,
        imageChangeHandler,
    } = useImageHandler();

    React.useEffect(() => {
        if (imageUrl !== null) {
            user.image_url = imageUrl;
        }
    }, [imageUrl]);

    return (
        <div className={classes.root}>
            <Formik
                initialValues={{
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, actions) =>
                    handleUserUpdate(values, actions, imageUrl)
                }
            >
                <Form className={classes.form}>
                    <Field
                        name="firstName"
                        type="text"
                        label="First Name"
                        component={TextField}
                        fullWidth
                    />

                    <Field
                        name="lastName"
                        type="text"
                        label="Last Name"
                        component={TextField}
                        fullWidth
                    />

                    <Field
                        name="phoneNumber"
                        type="text"
                        label="PhoneNumber"
                        component={TextField}
                        fullWidth
                    />

                    <Field
                        component={TextField}
                        fullWidth
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />
                    <div className={classes.UploadButton}>
                        {file == null && (
                            <UploadButton
                                imageChangeHandler={imageChangeHandler}
                                title={
                                    file == null
                                        ? "Edit Profile Picture"
                                        : "Profile Image Uploaded Successfully"
                                }
                            />
                        )}

                        {file && (
                            <ProgressBar
                                file={file}
                                setFile={setFile}
                                setImageUrl={setImageUrl}
                            />
                        )}
                    </div>

                    <div className={classes.actionButtons}>
                        <Button
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            className={classes.submit}
                            type="submit"
                        >
                            Ok
                            {loading && (
                                <CircularProgress
                                    size={30}
                                    className={classes.progress}
                                />
                            )}
                        </Button>

                        <Button
                            variant="contained"
                            color="default"
                            className={classes.submit}
                            onClick={handleCancel}
                        >
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Formik>
        </div>
    );
}

UserCardForm.propTypes = {
    classes: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    setEditUser: PropTypes.func.isRequired,
};

export default UserCardForm;
