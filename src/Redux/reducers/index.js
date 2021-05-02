import { combineReducers } from "redux";
import auth from "./authReducer";
import company from "./companyReducer";
import ui from "./uiReducer";
import menu from "./menuReducer";
import staffManagement from "./staffReducer";
import order from "./orderReducer";

export default combineReducers({
    auth,
    ui,
    staffManagement,
    company,
    menu,
    order,
});
