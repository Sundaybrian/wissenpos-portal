import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CardHeader, IconButton } from "@material-ui/core";
import { DeletePopUpDialog } from "../../../Base/DeleteDialog";
import {
    setCurrentMeal,
    deleteMeal,
} from "../../../../Redux/actions/menuActions";
import { connect } from "react-redux";
import formatDate from "../../../../Utils/formateDate";
import VerticonOptions from "../../../Base/VerticonOptions";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: theme.spacing(3),
    },
    media: {
        height: 240,
    },

    card: {
        maxWidth: 945,
    },
}));

function MealPreview(props) {
    const classes = useStyles();
    const {
        menu: { id, company_id },
        meal,
        setToogleMenuView,
        setMeal,
        toggleMenuView,
        setCurrentMeal,
        deleteMeal,
    } = props;

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleEditOpen = (close) => {
        setEditOpen(true);
        setToogleMenuView(true);
        setCurrentMeal(meal);
        close();
    };

    const handleDeleteDialogOpen = (close) => {
        setDeleteOpen(true);
        close();
    };

    const handleClose = () => {
        setDeleteOpen(false);
        setEditOpen(false);
    };

    const handleMealDelete = () => {
        console.log("deleted");

        deleteMeal({
            itemID: meal.id,
            categoryID: meal.category_id,
            menuID: id,
            companyID: company_id,
            setDeleteOpen,
            setMeal,
        });
    };

    const options = [
        { name: "edit", onClick: handleEditOpen },
        { name: "delete", onClick: handleDeleteDialogOpen },
    ];

    return (
        <div className={classes.root}>
            <Typography variant="h5" component="h6" gutterBottom>
                {meal.name} {toggleMenuView == true ? "Edit/Create" : "Preview"}
            </Typography>

            <Card className={classes.card}>
                <CardHeader
                    action={<VerticonOptions options={options} />}
                    subheader={formatDate(meal.created_at)}
                />
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={meal.image_url}
                        title={meal.name}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {meal.name}
                        </Typography>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            {meal.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Button size="small" color="primary">
                        price: ksh {meal.price}
                    </Button>
                    <Button size="small" color="primary">
                        Quantity: {meal.quantity}
                    </Button>
                </CardActions>
            </Card>

            <DeletePopUpDialog
                title={`delete ${meal.name}`}
                onSave={handleMealDelete}
                message="Are you sure you want to delete this meal, you cannot undo this action?"
                open={deleteOpen}
                handleClose={handleClose}
            />
        </div>
    );
}

const mapStateToProps = (state) => ({
    menu: state.menu.menu,
});
const mapActionsToProps = {
    deleteMeal,
    setCurrentMeal,
};

export default connect(mapStateToProps, mapActionsToProps)(MealPreview);
