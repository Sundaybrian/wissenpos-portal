import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SummaryCard from "../../../Base/SummaryCard";
import Loader from "../../../Base/Loader";

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
            {loadingData ? (
                <Loader />
            ) : (
                <>
                    <SummaryCard
                        title={"Jobs Posted"}
                        value={currentFreelancerStats.jobsPosted}
                    />
                    <SummaryCard
                        title={"Job Completed"}
                        value={currentFreelancerStats.completed}
                    />
                    <SummaryCard
                        title={"Rating"}
                        value={currentFreelancerStats.rating}
                    />
                </>
            )}
        </div>
    );
}

export default OrderSummary;
