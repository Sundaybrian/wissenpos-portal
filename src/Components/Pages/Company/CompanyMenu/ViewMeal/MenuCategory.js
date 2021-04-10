import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SingleFieldModal, {
    SingleFieldForm,
} from "../../../../Base/SingleFieldForm";
import { DeletePopUpDialog } from "../../../../Base/DeleteDialog";

import VerticonOptions from "../../../../Base/VerticonOptions";
import { Link, useLocation, useHistory } from "react-router-dom";

import { connect } from "react-redux";
import {
    renameCategoryMenu,
    deleteCategoryMenu,
} from "../../../../../Redux/actions/menuActions";
import * as Yup from "yup";

const validationSchema = Yup.object({
    name: Yup.string().required("category name is required"),
});

export function MenuCategory(props) {
    const {
        category,
        to,
        renameCategoryMenu,
        deleteCategoryMenu,
        company,
    } = props;
    const { pathname } = useLocation();
    const history = useHistory();
    const selected = pathname === `${to}`;

    const [openRename, setOpenRename] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);

    const handleRenameOpen = (handleVerticonClose) => {
        setOpenRename(true);
        handleVerticonClose();
    };

    const handleDeleteDailogOpen = (handleVerticonClose) => {
        setOpenDelete(true);
        handleVerticonClose(); // closes verticon passed up from verticon options
    };

    const handleClose = () => {
        setOpenDelete(false);
        setOpenRename(false);
    };

    const handleCategoryRename = (values, actions) => {
        console.log("hjkhgkjshdkjhsjksdh");
        const categoryData = {
            ...values,
            menu_id: category.menu_id,
        };
        renameCategoryMenu({
            companyID: company[0].id,
            menuID: category.menu_id,
            categoryID: category.id,
            categoryData,
        });

        actions.resetForm();
        setOpenRename(false);
    };

    const handleCategoryDelete = () => {
        console.log("deleted");
        deleteCategoryMenu({
            companyID: company[0].id,
            menuID: category.menu_id,
            categoryID: category.id,
            history,
        });
    };

    // categories options
    const options = [
        { name: "rename", onClick: handleRenameOpen },
        { name: "delete", onClick: handleDeleteDailogOpen },
    ];

    return (
        <>
            <ListItem
                button
                disableRipple
                to={to}
                component={Link}
                selected={selected}
            >
                <ListItemText primary={category.name} />
                {selected && (
                    <ListItemIcon>
                        <VerticonOptions options={options} />
                    </ListItemIcon>
                )}
            </ListItem>
            <SingleFieldModal
                handleClose={handleClose}
                title="rename category"
                open={openRename}
            >
                <SingleFieldForm
                    handleSubmit={handleCategoryRename}
                    initialValues={{
                        name: category.name,
                    }}
                    validationSchema={validationSchema}
                    name="name"
                    label="new name"
                />
            </SingleFieldModal>

            <DeletePopUpDialog
                title={`delete ${category.name}`}
                onSave={handleCategoryDelete}
                message="Deleting a category deletes also the meals under it, are you sure you want to proceed?"
                open={openDelete}
                handleClose={handleClose}
            />
        </>
    );
}

const mapStateToProps = (state) => ({
    company: state.company.company,
});

const mapActionsToProps = {
    renameCategoryMenu,
    deleteCategoryMenu,
};
export default connect(mapStateToProps, mapActionsToProps)(MenuCategory);
