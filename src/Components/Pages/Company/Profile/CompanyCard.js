import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import CardActionArea from '@material-ui/core/CardActionArea';
import IconButton from '@material-ui/core/IconButton';
import BankIcon from '@material-ui/icons/AccountBalance';
import EditIcon from '@material-ui/icons/Edit';
import SpeedIcon from '@material-ui/icons/Speed';
import { blue, green, pink } from '@material-ui/core/colors';

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
    company: { name, description, logo_url, website_url, id, email },
    setEditCompany,
  } = props;

  return (
    <>
      <>
        <CardActionArea>
          <CardHeader
            onClick={() => setEditCompany(true)}
            avatar={<Avatar aria-label="recipe" className={classes.green} src={logo_url} />}
            action={
              <IconButton aria-label="settings">
                <EditIcon />
              </IconButton>
            }
          />
          <CardContent>
            <Typography variant="body2" color="textSecondary" component="p">
              {description}
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
            title="Company Name"
            subheader={name}
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
            title="Company Website"
            subheader={website_url}
          />
        </CardActionArea>
      </>
    </>
  );
}

export default CompanyCard;
