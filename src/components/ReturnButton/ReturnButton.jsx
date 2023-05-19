import React from "react";
import {KeyboardReturn} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import "./ReturnButton.css"

const ReturnButton = ({link, text}) => {
    const navigate = useNavigate();

    const returnTo = () => {
        navigate(link);
    }
    return (
        <div className="return-button">
            <div onClick={returnTo}>
                <KeyboardReturn/>
                <span>{text}</span>
            </div>
        </div>
    );
}

export default ReturnButton;