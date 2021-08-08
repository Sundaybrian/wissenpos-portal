import React from "react";
import PropTypes from "prop-types";
// miu
import clsx from "clsx";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
// redux
import { connect } from "react-redux";
import { logoutUser } from "../../../Redux/actions/authActions";

export const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: "none",
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: "hidden",
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    table: {
        minWidth: 650,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    active: {
        backgroundColor: theme.palette.action.selected,
    },
}));

function ResponsiveDrawer(props) {
    const { routes, matchPath } = props;
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const { pathname } = useLocation();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleLogout = () => {
        props.logoutUser();
    };

    return (
        <>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        Wissenpos
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === "rtl" ? (
                            <ChevronRightIcon />
                        ) : (
                            <ChevronLeftIcon />
                        )}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {routes.map(
                        ({ text, icon: XIcon, path, component }, index) => (
                            <ListItem
                                component={RouterLink}
                                selected={pathname === `${matchPath}/${text}`}
                                to={`${matchPath}/${path}`}
                                button
                                key={index}
                            >
                                <Tooltip title={text} placement="right-start">
                                    <ListItemIcon>
                                        <Icon>
                                            <XIcon />
                                        </Icon>
                                    </ListItemIcon>
                                </Tooltip>
                                <ListItemText primary={text.toUpperCase()} />
                            </ListItem>
                        )
                    )}
                </List>
                <Divider />
                <List>
                    <ListItem
                        component={RouterLink}
                        button
                        key="Logout"
                        onClick={handleLogout}
                    >
                        <Tooltip title="logout" placement="right-start">
                            <ListItemIcon>
                                <Icon>
                                    <ExitToAppIcon />
                                </Icon>
                            </ListItemIcon>
                        </Tooltip>
                        <ListItemText primary={"logout".toUpperCase()} />
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
}

ResponsiveDrawer.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

const mapActionsToProps = {
    logoutUser,
};

export default connect(mapStateToProps, mapActionsToProps)(ResponsiveDrawer);
