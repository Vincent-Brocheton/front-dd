import React from 'react';
import Auth from "../services/Auth";
import {Navigate} from "react-router";

const PrivateRoute = ({children}) => {
    const isAuth = Auth.isAuthenticated();
    const isAdmin = Auth.isAdmin();
    if(!isAuth && !isAdmin){
        return <Navigate to={"/"}/>
    }
    return children
};

export default PrivateRoute;
