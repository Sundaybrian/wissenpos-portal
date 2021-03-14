import React, { useState } from "react";
import { Formik, Form } from "formik";
import Button from "@material-ui/core/Button";
import { Step, StepLabel, Stepper } from "@material-ui/core";

{
    /* <Button
fullWidth
variant="contained"
color="primary"
disabled={loading}
className={classes.submit}
type="submit"
>
Register
{loading && (
    <CircularProgress
        size={30}
        className={classes.progress}
    />
)}
</Button> */
}

export function FormikStep({ children, ...props }) {
    return <>{children}</>;
}

export function FormikStepper({ children, ...props }) {
    const childrenArray = React.Children.toArray(children).slice(0, 2);

    const [step, setStep] = useState(0);
    const currentChild = childrenArray[step];
    function isLastStep() {
        return step == childrenArray.length - 1;
    }
    return (
        <Formik
            {...props}
            validationSchema={currentChild.props.validationSchema}
            onSubmit={async (values, helpers) => {
                if (isLastStep()) {
                    await props.onSubmit(values, helpers);
                } else {
                    setStep((s) => s + 1);
                }
            }}
        >
            <Form>
                <Stepper alternativeLabel activeStep={step}>
                    {childrenArray.map((child, index) => (
                        <Step
                            key={child.props.label}
                            // completed={step > index || completed}
                        >
                            <StepLabel>{child.props.label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                {currentChild}

                {step > 0 ? (
                    <Button onClick={() => setStep((s) => s - 1)}>Back</Button>
                ) : null}
                <Button type="submit">
                    {isLastStep() ? "Submit" : "Next"}
                </Button>
            </Form>
        </Formik>
    );
}
