import React, { useState } from "react";
import { Formik, Form } from "formik";
import Button from "@material-ui/core/Button";
import { Step, StepLabel, Stepper } from "@material-ui/core";

export function FormikStep({ children, ...props }) {
    return <>{children}</>;
}

function FormikStepper({ children, onSubmit, ...props }) {
    const childrenArray = React.Children.toArray(children);

    const [step, setStep] = useState(0);
    const currentChild = childrenArray[step];
    const [completed, setCompleted] = useState(false);

    const isLastStep = () => {
        return step == childrenArray.length - 1;
    };

    return (
        <Formik
            {...props}
            validationsSchema={currentChild.props.validationsSchema}
            onSubmit={() => onSubmit(isLastStep)}
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
                {children}
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

export default FormikStepper;
