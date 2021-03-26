import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import CardActionArea from "@material-ui/core/CardActionArea";
import BankIcon from "@material-ui/icons/AccountBalance";
import ContactSupport from "@material-ui/icons/ContactSupport";
import SpeedIcon from "@material-ui/icons/Speed";
import { blue, green, pink } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    root: {
        maxWidth: 345,
    },

    depositContext: {
        flex: 1,
    },
    pink: {
        color: theme.palette.getContrastText(pink[500]),
        backgroundColor: pink[500],
    },
    blue: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: blue[500],
    },
    green: {
        color: theme.palette.getContrastText(blue[500]),
        backgroundColor: green[500],
    },
}));

function CompanyCard(props) {
    const classes = useStyles();
    const {
        user: {
            firstName,
            lastName,
            phoneNumber,
            image_url,
            id,
            email,
            isVerified,
        },
    } = props;

    return (
        <>
            <>
                <CardActionArea>
                    <CardContent>
                        <Typography
                            variant="body2"
                            color="textSecondary"
                            component="p"
                        >
                            {firstName} {lastName}
                        </Typography>
                    </CardContent>
                </CardActionArea>

                <CardActionArea>
                    <CardHeader
                        avatar={
                            <Avatar
                                aria-label="recipe"
                                className={classes.blue}
                            >
                                <BankIcon />
                            </Avatar>
                        }
                        title="PhoneNumber"
                        subheader={phoneNumber}
                    />
                </CardActionArea>
                <CardActionArea>
                    <CardHeader
                        avatar={
                            <Avatar
                                aria-label="recipe"
                                className={classes.green}
                            >
                                <SpeedIcon />
                            </Avatar>
                        }
                        title={"Company Email"}
                        subheader={email}
                    />
                </CardActionArea>

                <CardActionArea>
                    <CardHeader
                        avatar={
                            <Avatar
                                aria-label="recipe"
                                className={classes.blue}
                            >
                                <BankIcon />
                            </Avatar>
                        }
                        title="Account Verified"
                        subheader={isVerified ? "Verified" : "Not Verified"}
                    />
                </CardActionArea>
            </>
        </>
    );
}

export default CompanyCard;
