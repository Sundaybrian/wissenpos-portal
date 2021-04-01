import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { CardHeader, IconButton } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { setCurrentMeal } from "../../../../Redux/actions/menuActions";
import { connect } from "react-redux";

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
        meal,
        setToogleMenuView,
        setMeal,
        toggleMenuView,
        setCurrentMeal,
    } = props;

    return (
        <div className={classes.root}>
            <Typography variant="h5" component="h6" gutterBottom>
                {meal.name} {toggleMenuView == true ? "Edit/Create" : "Preview"}
            </Typography>

            <Card className={classes.card}>
                <CardHeader
                    action={
                        <IconButton
                            disabled={toggleMenuView == true ? true : false}
                            aria-label="settings"
                            onClick={() => {
                                // setMeal(null);
                                setToogleMenuView(true);
                                setCurrentMeal(meal);
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                    }
                    subheader={new Date().toISOString()}
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
        </div>
    );
}

export default connect(null, { setCurrentMeal })(MealPreview);
