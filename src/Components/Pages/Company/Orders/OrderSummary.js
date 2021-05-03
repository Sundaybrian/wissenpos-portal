import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import SummaryCard from "../../../Base/SummaryCard";
import Loader from "../../../Base/Loader";
import { loadOrderStats } from "../../../../Redux/actions/orderAction";
import { connect } from "react-redux";

const useStyles = makeStyles((theme) => ({
    summaryCards: {
        display: "flex",
        flexWrap: "wrap",
    },
    summaryCard: {
        margin: theme.spacing(1),
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

function OrderSummary(props) {
    const classes = useStyles();
    const {
        company: { id },
        loadOrderStats,
        loadingData,
        stats,
    } = props;

    useEffect(() => {
        loadOrderStats({ companyID: id });
    }, []);

    if (loadingData) {
        return (
            <>
                <SummaryCard title={"InCart"} value={0} />
                <SummaryCard title={"All"} value={0} />
                <SummaryCard title={"Paid"} value={0} />
            </>
        );
    }
    return (
        <div className={classes.summaryCards}>
            {stats && (
                <>
                    <SummaryCard title={"InCart"} value={stats.inCart} />
                    <SummaryCard title={"Paid"} value={stats.paid} />
                    <SummaryCard title={"Returns"} value={stats.returns} />
                </>
            )}
        </div>
    );
}

const mapStateToProps = (state) => ({
    loadingData: state.ui.loadingData,
    company: state.company.company[0],
    stats: state.order.stats,
});

const mapActionsToProps = {
    loadOrderStats,
};

OrderSummary.propTypes = {
    loadingData: PropTypes.bool.isRequired,
    company: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, mapActionsToProps)(OrderSummary);
