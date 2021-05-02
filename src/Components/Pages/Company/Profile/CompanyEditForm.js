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
    uploadButton: {
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
    name: Yup.string().required("companyName is required"),
    description: Yup.string()
        .max(200, "must not exceed 200 characters")
        .required("company description is required"),
    website_url: Yup.string().max(200, "must not exceed 15 characters"),
    email: Yup.string().email("invalid companyEmail address").required(),
});

function CompanyEditFormik(props) {
    const { handleCompanyUpdate, setEditCompany, company, loading } = props;
    const classes = useStyles();

    const handleCancel = () => {
        setEditCompany(false);
    };

    const {
        file,
        setFile,
        imageUrl,
        setImageUrl,
        imageChangeHandler,
    } = useImageHandler();

    return (
        <div className={classes.root}>
            <Formik
                initialValues={{
                    name: company.name,
                    email: company.email,
                    description: company.description,
                    website_url: company.website_url ?? " ",
                }}
                validationSchema={validationSchema}
                onSubmit={(values, actions) =>
                    handleCompanyUpdate(values, actions, imageUrl)
                }
            >
                <Form className={classes.form}>
                    <Field
                        name="name"
                        type="text"
                        label="Company Name"
                        component={TextField}
                        fullWidth
                    />

                    <Field
                        name="description"
                        type="text"
                        label="Company Description"
                        component={TextField}
                        fullWidth
                    />

                    <Field
                        name="website_url"
                        type="text"
                        label="Company Website"
                        component={TextField}
                        fullWidth
                    />

                    <Field
                        component={TextField}
                        fullWidth
                        label="CompanyEmail Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                    />

                    <div className={classes.uploadButton}>
                        {file == null && (
                            <UploadButton
                                imageChangeHandler={imageChangeHandler}
                                title={
                                    file == null
                                        ? "Edit Logo"
                                        : "Logo Image Uploaded Successfully"
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

CompanyEditFormik.propTypes = {
    classes: PropTypes.object.isRequired,
    handleCompanyUpdate: PropTypes.func.isRequired,
    company: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    setEditCompany: PropTypes.func.isRequired,
};

export default CompanyEditFormik;
