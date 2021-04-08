import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import VerticonOptions from "../../../../Base/VerticonOptions";
import SingleFieldModal, {
    SingleFieldForm,
} from "../../../../Base/SingleFieldForm";
import { DeletePopUpDialog } from "../../../../Base/DeleteDialog";
import QRCard from "./QRCard";

import QrCode from "qrcode";
import { connect } from "react-redux";
import {
    updateMenu,
    deleteMenu,
} from "../../../../../Redux/actions/menuActions";
import Config from "../../../../../Utils/config";

import * as Yup from "yup";
import { Typography } from "@material-ui/core";
const validationSchema = Yup.object({
    name: Yup.string().required("category name is required"),
});

function MenuButton(props) {
    const { companyMenu, updateMenu, deleteMenu } = props;
    const [open, setOpen] = React.useState(false);

    const [openPopUp, setOpenPopUp] = React.useState(false);
    const [openQr, setOpenQr] = React.useState(false);
    const [imageUrl, setImageUrl] = React.useState("");

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
        setOpenQr(false);
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

        deleteMenu(companyMenu.company_id, companyMenu.id, setOpenPopUp);
    };

    const handleQrCodeDialogOpen = async (handleVerticonClose) => {
        try {
            handleVerticonClose(true);
            setOpenQr(true);

            const url = Config["BACKEND_SERVICE"];
            const menUrl = `${url}/company/${companyMenu.company_id}/menu`; //generate entry url
            const res = await QrCode.toDataURL(menUrl);
            setImageUrl(res);
        } catch (error) {
            console.log(error);
        }
    };

    const options = [
        { name: "rename menu", onClick: handleClickOpen },
        { name: "delete menu", onClick: handleDeleteDialogOpen },
        { name: "generate QrCode", onClick: handleQrCodeDialogOpen },
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

            <SingleFieldModal
                handleClose={handleClose}
                title="Click Qr to Download"
                open={openQr}
            >
                {imageUrl ? (
                    <a href={imageUrl} download>
                        <QRCard imageUrl={imageUrl} />
                    </a>
                ) : (
                    <Typography variant="h5" component="h6">
                        Please wait... generating QrCode
                    </Typography>
                )}
            </SingleFieldModal>
        </>
    );
}

const mapActionsToProps = {
    updateMenu,
    deleteMenu,
};

export default connect(null, mapActionsToProps)(MenuButton);
