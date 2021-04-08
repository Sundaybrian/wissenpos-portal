import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import VerticonOptions from "../../../../Base/VerticonOptions";
import SingleFieldModal, {
    SingleFieldForm,
} from "../../../../Base/SingleFieldForm";
import { DeletePopUpDialog } from "../../../../Base/DeleteDialog";

import { connect } from "react-redux";
import { updateMenu } from "../../../../../Redux/actions/menuActions";

import * as Yup from "yup";
const validationSchema = Yup.object({
    name: Yup.string().required("category name is required"),
});

function MenuButton(props) {
    const { companyMenu, updateMenu } = props;
    const [open, setOpen] = React.useState(false);

    const [openPopUp, setOpenPopUp] = React.useState(false);

    const handleClickOpen = (handleVerticonClose) => {
        setOpen(true);
        handleVerticonClose(); //passed up from verticonOptiosn to close  it
    };

    const handleDeleteDialogOpen = (handleVerticonClose) => {
        setOpenPopUp(true);
        handleVerticonClose();
    };

    const handleClose = () => {
        setOpen(false);
        setOpenPopUp(false);
    };

    const handleMenuRename = (values, actions) => {
        //pop up dialog
        const menuData = { ...values };
        updateMenu(companyMenu.id, companyMenu.company_id, menuData);

        actions.resetForm();
        handleClose(); // passed up from verticonOptions
    };

    const handleMenuDelete = () => {
        console.log("clicked");
    };

    const options = [
        { name: "rename menu", onClick: handleClickOpen },
        { name: "delete menu", onClick: handleDeleteDialogOpen },
    ];

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
            >
                <SingleFieldForm
                    handleSubmit={handleMenuRename}
                    initialValues={{
                        name: companyMenu.name,
                    }}
                    validationSchema={validationSchema}
                    name="name"
                    label="new name"
                />
            </SingleFieldModal>

            <DeletePopUpDialog
                title={`delete ${companyMenu.name}`}
                onSave={handleMenuDelete}
                message="This action cannot be undone, every meal and category will be lost forever...are you sure you wish to proceed?"
                open={openPopUp}
                handleClose={handleClose}
            />
        </>
    );
}

const mapActionsToProps = {
    updateMenu,
};

export default connect(null, mapActionsToProps)(MenuButton);
