import Button from "@material-ui/core/Button";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import { Grid } from "@material-ui/core";

export function SingleFieldForm(props) {
    const {
        handleSubmit,
        initialValues,
        validationSchema,
        name,
        label,
    } = props;
    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            <Form>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Field
                            name={name}
                            type="text"
                            label={label}
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
