import React from "react";
import "../../styles/adminpanel.css"
import {Link} from "react-router-dom";

const AdminPanel = () => {
    return (
        <>
            <h1>Admin Panel</h1>
            <div className="content-admin">

                <Link to={"/users"} className="nav-link">
                    <div className="button-menu">
                        Gestion des utilisateurs
                    </div>
                </Link>
                <Link to={"/races"} className="nav-link">
                    <div className="button-menu">Gestion des Races</div>
                </Link>
                <Link to={"/classes"} className="nav-link">
                    <div className="button-menu">Gestion des classes</div>
                </Link>
                <Link to={"#"} className="nav-link">
                    <div className="button-menu">Gestion des Sorts</div>
                </Link>
                <Link to={"#"} className="nav-link">
                    <div className="button-menu">Gestion des Objets</div>
                </Link>
                <Link to={"#"} className="nav-link">
                    <div className="button-menu">Gestion des Dons</div>
                </Link>
                <Link to={"#"} className="nav-link">
                    <div className="button-menu">Gestion des Compétences</div>
                </Link>
                <Link to={"#"} className="nav-link">
                    <div className="button-menu">Gestion des écoles</div>
                </Link>
                <Link to={"#"} className="nav-link">
                    <div className="button-menu">Gestion des Manifestations Occultes</div>
                </Link>
            </div>
        </>
    );
}

export default AdminPanel