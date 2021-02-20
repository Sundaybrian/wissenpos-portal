// admin routes

// owner routes

// staff routes

// mui stuff
import HomeIcon from "@material-ui/icons/Home";
import BusinessIcon from "@material-ui/icons/Business";
import Metric from "../Company/Metric/Metric";
import DataUsageIcon from "@material-ui/icons/DataUsage";
import GroupIcon from "@material-ui/icons/Group";
import PersonIcon from "@material-ui/icons/Person";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";

//pages company
import Staff from "../Company/Staff/Staff";
import CompanyMenu from "../Company/CompanyMenu/CompanyMenu";
import Orders from "../Company/Orders/Orders";
import Profile from "../Company/Profile/Profile";
import Metric from "../Company/Metric/Metric";

const dashboardRoutes = [
    {
        path: "/",
    },
];

export const companyRoutes = [
    {
        path: "/metrics",
        component: Metric,
        text: "metrics",
        icon: DataUsageIcon,
    },
    {
        path: "/staff-management",
        component: Staff,
        text: "staff",
        icon: GroupIcon,
    },
    {
        path: "/menu",
        component: CompanyMenu,
        text: "metrics",
        icon: BusinessIcon,
    },
    {
        path: "/orders",
        component: Orders,
        text: "metrics",
        icon: ShoppingBasketIcon,
    },
    {
        path: "/profile",
        component: Profile,
        text: "profile",
        icon: PersonIcon,
    },
];

export default dashboardRoutes;
