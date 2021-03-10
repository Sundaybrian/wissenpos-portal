import Login from "./Components/Pages/Login/Login";
import Register from "./Components/Pages/Register/Register";
import Home from "./Components/Pages/Home";
import Dashboard from "./Components/Pages/Dashboard/Dashboard";

const routes = [
    {
        path: "/",
        component: Login,
        routes: [
            {
                path: "/login",
                component: Login,
            },
            {
                path: "/register",
                component: Register,
            },
        ],
    },
    {
        path: "/dashboard",
        component: Dashboard,
    },
];

export default routes;
