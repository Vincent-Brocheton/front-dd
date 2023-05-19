import axios from "axios";
import jwtDecode from "jwt-decode";
import {LOGIN_CHECK} from "./config";

function authenticate(credentials) {
    return axios
        .post(LOGIN_CHECK, credentials)
        .then(response => response.data.token)
        .then(token => {
            //Je stock le token dans le localeStorage
            window.localStorage.setItem("authToken", token);
            //On previent axios que on a maintenant un header sur toutes nos futures requêtes http
            setAxiosToken(token);
            return true;
        })
}

function logout(){
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers['Authorization'];
}

function setAxiosToken(token){
    axios.defaults.headers['Authorization'] = "Bearer " + token;
}

function setup(){
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const {exp : expiration} = jwtDecode(token);
        if ((expiration * 1000) > new Date().getTime()) {
            setAxiosToken(token);
        } else {
            logout();
        }
    }else{
        logout();
    }
}

function isAuthenticated(){
    const token = window.localStorage.getItem("authToken");
    if (token) {
        const {exp: expiration} = jwtDecode(token);
        if ((expiration * 1000) > new Date().getTime()) {
            return true;
        }
        return false;

    }else{
        return false;
    }
}

function getRoles(){
    const token = window.localStorage.getItem("authToken");
    if(isAuthenticated() === true){
        const {roles} = jwtDecode(token);
        let roleName
        if(roles.includes("ROLE_ADMIN")){
            roleName = "Administrateur"
        }else{
            roleName = "Utilisateur"
        }
        return roleName;
    }else{
        return []
    }
}

function getUsername(){
    const token = window.localStorage.getItem("authToken");
    if(isAuthenticated() === true){
        const {username} = jwtDecode(token);
        return username;
    }else{
        return []
    }
}

function isAdmin(){
    const token = window.localStorage.getItem("authToken");
    if(isAuthenticated() === true){
        const {roles} = jwtDecode(token);

        return roles.includes("ROLE_ADMIN");
    }else{
        return []
    }
}

export default {
    authenticate,
    logout,
    setup,
    isAuthenticated,
    getRoles,
    getUsername,
    isAdmin
}
