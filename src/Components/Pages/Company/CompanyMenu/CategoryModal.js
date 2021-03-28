import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
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
});

export function CategoryForm(props) {
    const { handleCategorySubmit } = props;
    return (
        <Formik
            initialValues={{
                name: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleCategorySubmit}
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

const useStyles = makeStyles((theme) => ({
    dialogWrapper: {
        padding: theme.spacing(2),
        position: "absolute",
        top: theme.spacing(5),
    },
    dialogTitle: {
        paddingRight: "0px",
    },
}));

export default function CategoryModal({
    title,
    data,
    render,
    onSave,
    menuID,
    companyID,
    addCategoryMenu,
}) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const handleSave = () => {
    //     onSave && onSave();
    //     handleClose();
    // };

    const handleCategorySubmit = (values, action) => {
        const categoryData = {
            ...values,
            menu_id: menuID,
        };

        addCategoryMenu(companyID, menuID, categoryData);
        handleClose();
    };

    return (
        <>
            {render(handleClickOpen)}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                maxWidth="md"
            >
                <DialogTitle
                    id="form-dialog-title"
                    className={classes.dialogTitle}
                >
                    <div
                        style={{
                            display: "flex",
                        }}
                    >
                        <Typography
                            variant="h6"
                            component="div"
                            style={{ flexGrow: 1 }}
                        >
                            {title}
                        </Typography>
                        <Controls.ActionButton
                            color="secondary"
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </Controls.ActionButton>
                    </div>
                </DialogTitle>
                <DialogContent dividers>
                    <CategoryForm handleCategorySubmit={handleCategorySubmit} />
                </DialogContent>
                {/* <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {data ? "Close" : "Cancel"}
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions> */}
            </Dialog>
        </>
    );
}
