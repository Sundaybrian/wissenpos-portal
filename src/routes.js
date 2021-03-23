import Login from "./Components/Pages/Auth/Login/Login";
import Register from "./Components/Pages/Auth/Register/Register";

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
];

export default routes;
