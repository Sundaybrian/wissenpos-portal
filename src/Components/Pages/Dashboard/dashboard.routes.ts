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
import StaffProfile from "../Company/Staff/StaffProfile";
import CompanyMenuContainer from "../Company/CompanyMenu/CompanyMenuContainer";
import Orders from "../Company/Orders/Orders";
import Profile from "../Company/Profile/Profile";
import Metric from "../Company/Metric/Metric";
import CompanyMenu from "../Company/CompanyMenu/CompanyMenu";
// import AddRecipe from "../Company/CompanyMenu/AddRecipe";

const dashboardRoutes = [
    {
        path: "/",
    },
];

export const companyRoutes = [
    {
        path: "reports",
        component: Metric,
        text: "reports",
        icon: DataUsageIcon,
        layout:"/company"
    },
    {
        path: "staff-management",
        component: Staff,
        text: "staff-management",
        icon: GroupIcon,
        layout:"/company",
        routes:[
            {
                path: ":id/profile",
                component: StaffProfile
               
            }
        ]
    },
    {
        path: "menus",
        component: CompanyMenuContainer,
        text: "menus",
        icon: BusinessIcon,
        layout:"/company",

        routes:[
            {
                path:"",
                text: "menus",
                component: CompanyMenu
            },
            // {
            //     path: "add-recipe",
            //     text:"add-recipe",
            //     component: AddRecipe
               
            // }
        ]
    },
    {
        path: "orders",
        component: Orders,
        text: "orders",
        icon: ShoppingBasketIcon,
        layout:"/company"
    },
    {
        path: "profile",
        component: Profile,
        text: "profile",
        icon: PersonIcon,
        layout:"/company"
    },
];

export default dashboardRoutes;
