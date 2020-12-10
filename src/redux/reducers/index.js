import { combineReducers } from "redux";
import auth from "./authReducer";
import ui from "./uiReducer";

export default combineReducers({
    auth,
    ui,
});
