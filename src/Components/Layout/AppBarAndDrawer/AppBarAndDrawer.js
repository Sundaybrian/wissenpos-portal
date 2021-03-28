import React, { useEffect } from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Tooltip from "@material-ui/core/Tooltip";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Link as RouterLink, useLocation } from "react-router-dom";
import Icon from "@material-ui/core/Icon";
import Avatar from "@material-ui/core/Avatar";
import Badge from "@material-ui/core/Badge";
import MailIcon from "@material-ui/icons/Mail";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PalettePicker from "../../../Theme/PalettePicker";
// redux
import { connect } from "react-redux";
import { logoutUser } from "../../../Redux/actions/authActions";
export const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    logo: {
        color: "white",
        textDecoration: "none",
    },
    drawer: {
        [theme.breakpoints.up("sm")]: {
            width: drawerWidth,
            flexShrink: 0,
        },
    },
    appBar: {
        [theme.breakpoints.up("sm")]: {
            width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
            // backgroundColor: `#${theme.palette.primary[300].substring(1)}77`,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up("sm")]: {
            display: "none",
        },
    },
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    active: {
        backgroundColor: theme.palette.action.selected,
    },
}));

function ResponsiveDrawer(props) {
    const {
        container,
        setCurrentTheme,
        currentTheme,
        routes,
        matchPath,
    } = props;
    const classes = useStyles();
    const theme = useTheme();
    const { pathname } = useLocation();
    const isHome = false; // pathname === "/";
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    /* Modifying the source code from the template example to use the react router pathname hook to set
  selected prop and to use the react router component prop */

    const handleLogout = () => {
        props.logoutUser();
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {routes.map(({ text, icon: XIcon, path, component }, index) => (
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
                        <ListItemText primary={`${text}`.toUpperCase()} />
                    </ListItem>
                ))}
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
        </div>
    );

    return (
        <div className={classes.root}>
            <CssBaseline />
            <div
                style={{
                    height: "64px",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    filter: "contrast(75%)",
                    backgroundImage: "url(/img/wallpaper.jpeg)",
                    position: "absolute",
                    top: "0px",
                    width: "100%",
                    zIndex: -2,
                }}
            />
            <AppBar position="sticky" className={isHome ? "" : classes.appBar}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        to={"/"}
                        component={RouterLink}
                        className={classes.logo}
                    >
                        Wissenpos
                    </Typography>
                    <div style={{ flexGrow: 1 }}></div>
                    {/* <PalettePicker
                        setCurrentTheme={setCurrentTheme}
                        currentTheme={currentTheme}
                    /> */}
                    <Badge badgeContent={4} color="primary">
                        <MailIcon />
                    </Badge>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerToggle}
                    >
                        <Avatar src="/img/driver.png" />
                    </IconButton>
                </Toolbar>
            </AppBar>
            {isHome && !mobileOpen ? (
                <div />
            ) : (
                <nav aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={
                                theme.direction === "rtl" ? "right" : "left"
                            }
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open={isHome}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                </nav>
            )}
        </div>
    );
}

ResponsiveDrawer.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    container: PropTypes.instanceOf(
        typeof Element === "undefined" ? Object : Element
    ),
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

const mapActionsToProps = {
    logoutUser,
};

export default connect(mapStateToProps, mapActionsToProps)(ResponsiveDrawer);
