import React from "react";
import { useNavigate } from "react-router-dom";

const NotifyProvider = ({ children, report, isClick }) => {
    const navigate = useNavigate();

    console.log("report", report);
    console.log("isClick", isClick);

        if (isClick === true) {
            console.log("cc");
            navigate("/report/" + report._id);
        }
        



return <>{children}</>;
};

export default NotifyProvider;
