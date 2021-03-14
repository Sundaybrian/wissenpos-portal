// admin routes

// owner routes

// staff routes

// mui stuff
import HomeIcon from "@material-ui/icons/Home";
import BusinessIcon from "@material-ui/icons/Business";
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
        path: "/dashboard/metrics",
        component: Metric,
        text: "metrics",
        icon: DataUsageIcon,
        layout:"/company"
    },
    {
        path: "/dashboard/staff-management",
        component: Staff,
        text: "staff-management",
        icon: GroupIcon,
        layout:"/company"
    },
    {
        path: "/dashboard/menus",
        component: CompanyMenu,
        text: "menus",
        icon: BusinessIcon,
        layout:"/company"
    },
    {
        path: "/dashboard/orders",
        component: Orders,
        text: "orders",
        icon: ShoppingBasketIcon,
        layout:"/company"
    },
    {
        path: "/dashboard/profile",
        component: Profile,
        text: "profile",
        icon: PersonIcon,
        layout:"/company"
    },
];

export default dashboardRoutes;
