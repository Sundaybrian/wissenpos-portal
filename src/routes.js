import Login from "./components/pages/Login/Login";
import Register from "./components/pages/Register/Register";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard/Dashboard";

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
