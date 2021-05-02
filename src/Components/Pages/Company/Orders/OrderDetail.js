import React, { useEffect } from "react";
import PropTypes from "prop-types";
import SummaryCard from "../../../Base/SummaryCard";
import makeStyles from "@material-ui/core/styles/makeStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { fetchCartItems } from "../../../../Redux/actions/orderAction";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: "36ch",
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: "inline",
    },

    root1: {
        background: "red",
        width: "340px",
        flexShrink: 0,
        height: "100vh",
    },
}));

export function AlignItemsList(props) {
    const { items } = props;
    const classes = useStyles();

    return items.map((item, index) => (
        <List className={classes.root}>
            <ListItem alignItems="flex-start">
                <ListItemAvatar>
                    <Avatar
                        alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                    />
                </ListItemAvatar>
                <ListItemText
                    primary="Brunch this weekend?"
                    secondary={
                        <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                Ali Connors
                            </Typography>
                            {
                                " — I'll be in your neighborhood doing errands this…"
                            }
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </List>
    ));
}

function OrderDetail(props) {
    const {
        currentOrder: cart,
        loading,
        fetchCartItems,
        company: { company, items },
    } = props;

    const classes = useStyles();

    useEffect(() => {
        // fecth cart items
        fetchCartItems({
            cart_id: cart_id,
            company_id: company[0].id,
        });
    }, [cart]);

    return (
        <div className={classes.root1}>
            <SummaryCard
                title={cart.cart_id}
                component={<AlignItemsList items={cart.items} />}
            />
            ;
        </div>
    );
}
const mapStateToProps = (state) => ({
    company: state.company,
});
const mapActionsToProps = {
    fetchCartItems,
};

OrderDetail.propTypes = {
    cart: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    fetchCartItems: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapActionToProps)(OrderDetail);
