import React from "react";
import Sidebar from "../../layout/Sidebar";
import Icon from "@material-ui/core/Icon";
function Dashboard() {
    const home = "home";
    return (
        <div>
            <Icon>{home}</Icon>
            <Sidebar />
        </div>
    );
}

export default Dashboard;
