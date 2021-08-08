import Login from './Components/Pages/Auth/Login/Login';
import CompanyRegistration from './Components/Pages/Auth/Register/SimpleRegister/CompanyRegistration';
import Register from './Components/Pages/Auth/Register/SimpleRegister/Register';

const routes = [
  {
    path: '/register',
    exact: true,
    component: Register,
  },
  {
    path: '/login',
    exact: true,
    component: Login,
  },
  {
    path: '/company-registration',
    exact: true,
    component: CompanyRegistration,
  },
];

export default routes;
