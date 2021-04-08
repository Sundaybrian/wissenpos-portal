import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import VerticonOptions from "../../../../Base/VerticonOptions";
import SingleFieldModal, {
    SingleFieldForm,
} from "../../../../Base/SingleFieldForm";

import * as Yup from "yup";
const validationSchema = Yup.object({
    name: Yup.string().required("category name is required"),
});

function MenuButton(props) {
    const { companyMenu } = props;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleMenuRename = (handleClose) => {
        //pop up dialog

        handleClose(); // passed up from verticonOptions
    };

    const options = [{ name: "Rename Menu", onClick: handleClickOpen }];

    return (
        <>
            <Button
                color="secondary"
                endIcon={<VerticonOptions options={options} />}
                fullWidth
                disableRipple
            >
                {companyMenu.name}
            </Button>

            <SingleFieldModal
                handleClose={handleClose}
                title="Rename Menu"
                open={open}
            ></SingleFieldModal>
        </>
    );
}

export default MenuButton;
