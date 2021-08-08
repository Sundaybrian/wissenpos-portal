import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';
import BankIcon from '@material-ui/icons/AccountBalance';
import { IconButton } from '@material-ui/core';
import SpeedIcon from '@material-ui/icons/Speed';
import { blue, green, pink } from '@material-ui/core/colors';
import EditIcon from '@material-ui/icons/Edit';
import formatDate from '../../../../Utils/formatDate';

const useStyles = makeStyles(theme => ({
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
    user: { firstName, lastName, phoneNumber, id, email, isVerified },
    setEditUser,
  } = props;

  return (
    <>
      <>
        <CardActionArea>
          <CardHeader
            onClick={() => setEditUser(true)}
            action={
              <IconButton aria-label="settings">
                <EditIcon />
              </IconButton>
            }
            subheader={`${phoneNumber}`}
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {firstName} {lastName}
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActionArea>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.blue}>
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
              <Avatar aria-label="recipe" className={classes.green}>
                <SpeedIcon />
              </Avatar>
            }
            title={'Company Email'}
            subheader={email}
          />
        </CardActionArea>

        <CardActionArea>
          <CardHeader
            avatar={
              <Avatar aria-label="recipe" className={classes.blue}>
                <BankIcon />
              </Avatar>
            }
            title="Account Verified"
            subheader={isVerified ? 'Verified' : 'Not Verified'}
          />
        </CardActionArea>
      </>
    </>
  );
}

export default CompanyCard;
