import React from "react";
import { useParams } from "react-router-dom";
import Content from "../../../Layout/Content/Content";

function StaffProfile(props) {
    const { id } = useParams();
    return (
        <Content>
            <div>hello {id} staff </div>;
        </Content>
    );
}

export default StaffProfile;
