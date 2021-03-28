import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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

export default function Meal(props) {
    const classes = useStyles();
    const { meal } = props;

    return (
        <div className={classes.root}>
            <Typography variant="h5" component="h6" gutterBottom>
                {meal.name} Preview
            </Typography>

            <Card className={classes.card}>
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
