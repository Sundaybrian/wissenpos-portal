import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function PeopleDialog({
    title,
    data,
    render,
    onSave,
    children,
}) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSave = () => {
        // const action = data ? update : add;
        // dispatch(action({ name, id: id || nextID(), img }));
        onSave && onSave();
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
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                <DialogContent dividers>{children}</DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        {data ? "Close" : "Cancel"}
                    </Button>
                    <Button onClick={handleSave} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
