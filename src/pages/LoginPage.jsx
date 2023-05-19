import React, {useContext, useState} from 'react';
import '../styles/Login.css';
// import logoMEA from '../assets/LogoMea.png';
import Button from '../components/Button/Button';
import {useNavigate} from "react-router-dom";
import Auth from "../services/Auth";
import {toast} from "react-toastify";
import AuthContext from "../context/AuthContext";

const LoginPage = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const {setIsAuthenticated} = useContext(AuthContext)
    const navigate = useNavigate();

    const handleChange = ({target}) => {
        const {name, value} = target;
        setCredentials({...credentials, [name]: value});
    }

    const handleSubmit = async () => {
        console.log(credentials)
        try {
            await Auth.authenticate(credentials);
            setIsAuthenticated(true)

            console.log('connecte');
            toast.success('Vous êtes bien connecté');
            navigate("/");
        } catch (e) {
            console.log(e)
            toast.error("Erreur lors de l'authentification, veuillez verifier votre connexion et/ou vos identifiants")
        }
    }
    return (
        <div className='containerLoginPage'>
            <div className='containerLogoLoginPage'>
                {/*<img src={logoMEA}/>*/}
            </div>
            <div className='containerFormLoginPage'>
                <div className='loginPageBloc'>
                    <label htmlFor="username">Nom d'utilisateur :</label>
                    <input name="username" value={credentials.username} onChange={handleChange} id="username"/>
                </div>
                <div className='loginPageBloc'>
                    <label htmlFor="password">Mot de passe :</label>
                    <input name="password" value={credentials.password} type="password" id="password" onChange={handleChange}/>
                </div>
                <div className='ButtonContainer'>
                    <Button value="Se Connecter" type="submit" onClick={handleSubmit}/>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
