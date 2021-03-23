import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

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

export default function SummaryCard({ title, value, component }) {
    const classes = useStyles();
    return (
        <Paper elevation={2} className={classes.summaryCard}>
            <Typography color={"textSecondary"} variant="h5" gutterBottom>
                {title}
            </Typography>
            {component || (
                <Typography color={"primary"} variant="h3">
                    {value}
                </Typography>
            )}
        </Paper>
    );
}
