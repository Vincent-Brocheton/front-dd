import React, {useContext, useState} from "react";
import "./navbar.css"
import {Logout} from "@mui/icons-material";
import Auth from "../../services/Auth";
import AuthContext from "../../context/AuthContext";
import {Link, useNavigate} from "react-router-dom";

const Navbar = () => {
    const [showNavbar, setShowNavbar] = useState(false);
    const {setIsAuthenticated} = useContext(AuthContext);
    const isAdmin = Auth.isAdmin();

    const navigate = useNavigate();

    const handleMenuClick = () => {
        setShowNavbar(!showNavbar);
    };

    const logout = async () => {
        await Auth.logout();
        setIsAuthenticated(false);
        navigate("/");
    }
    return (
        <div className="nav-self">
            <button onClick={handleMenuClick} className="open-button">☰</button>
            {showNavbar && <div className='overlay' onClick={handleMenuClick}></div>}
            <div className={`navbar-self ${showNavbar ? 'open' : ''}`}>
                <button onClick={handleMenuClick} className='close-button'>×</button>
                <div className="content-nav">
                    <ul>
                        <li><Link to={"/"} className="nav-link" onClick={handleMenuClick}>Accueil</Link></li>
                        {isAdmin && <li><Link to={"/admin"} className="nav-link" onClick={handleMenuClick}>Panel d'Admin</Link></li> }
                    </ul>
                    <button className="btn btn-primary" onClick={logout}>Déconnexion   <Logout/></button>
                </div>

            </div>
        </div>
    );
};

export default Navbar