import Login from "./Components/Pages/Auth/Login/Login";
import Register from "./Components/Pages/Auth/Register/Register";

import Dashboard from "./Components/Pages/Dashboard/Dashboard";

const routes = [
    {
        path: "/register",
        exact: true,
        component: Register,
    },
    {
        path: "/login",
        exact: true,
        component: Login,
    },
    {
        path: "/",
        component: Dashboard,
    },
];

export default routes;
