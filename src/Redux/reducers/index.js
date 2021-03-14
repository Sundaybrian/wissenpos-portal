import { combineReducers } from "redux";
import auth from "./authReducer";
import ui from "./uiReducer";
import staffManagement from "./staffReducer";

export default combineReducers({
    auth,
    ui,
    staffManagement,
});
