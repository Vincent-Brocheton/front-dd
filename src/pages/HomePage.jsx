import React from "react";
import Auth from "../services/Auth";

const HomePage = () => {
    const username = Auth.getUsername();
    const roles = Auth.getRoles();
    return (<>
        <h1>Bonjour, {username} !</h1>
            <p>Vous êtes connecté en tant que {roles}</p>
    </>
    );
}

export default HomePage