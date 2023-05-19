import React from "react";
import ReturnButton from "./ReturnButton/ReturnButton";

const AdminHeader = ({link,returnText,text}) => {
    return <>
        <div className="d-flex align-items-center flex-wrap mb-5">
            <div className="col-12 col-md-3"><ReturnButton link={link} text={returnText}/></div>
            <h1 className="col-12 col-md-6 text-center">{text}</h1>
        </div>
    </>
}

export default AdminHeader;