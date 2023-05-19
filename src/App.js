import React, {useEffect, useState} from "react";
import {BrowserRouter, useLocation} from "react-router-dom";
import {Route, Routes} from "react-router";

import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoute from "./components/PrivateRoute";

import axios from "axios";
import Loading from "./components/Loading/Loading";
import Auth from "./services/Auth";
import AuthContext from "./context/AuthContext";
import Navbar from "./components/Navbar/Navbar";
import AdminRoute from "./components/AdminRoute";


const LoginPage = React.lazy(() => import('./pages/LoginPage'));
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AdminPanel = React.lazy(() => import('./pages/AdminPage/AdminPanel'));
const ClasseGestionPage = React.lazy(()=> import('./pages/AdminPage/ClasseGestionPage'))
const CompetenceGestionPage = React.lazy(()=> import('./pages/AdminPage/CompetenceGestionPage'))
const DonsGestionPage = React.lazy(()=> import('./pages/AdminPage/DonsGestionPage'))
const EcoleGestionPage = React.lazy(()=> import('./pages/AdminPage/EcoleGestionPage'))
const ManifestationOccultesPage = React.lazy(()=> import('./pages/AdminPage/ManifestionOccultesPage'))
const ObjetGestionPage = React.lazy(()=> import('./pages/AdminPage/ObjetGestionPage'))
const RaceGestionPage = React.lazy(()=> import('./pages/AdminPage/RaceGestionPage'))
const SortsGestionPage = React.lazy(()=> import('./pages/AdminPage/SortsGestionPage'))
const UserGestionPage = React.lazy(()=> import('./pages/AdminPage/UserGestionPage'))
const ClasseForm = React.lazy(()=> import('./pages/AdminPage/ClassForm'))

axios.defaults.withCredentials = true;

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(Auth.isAuthenticated);
    return (<AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
            <div className="container">
                <BrowserRouter>
                    {isAuthenticated && <Navbar/>}

                    <Routes>
                        {!isAuthenticated && <Route element={
                            <React.Suspense fallback={<><Loading/></>}>
                                <LoginPage/>
                            </React.Suspense>
                        } path={"/"}/>}
                        <Route element={
                            <React.Suspense fallback={<><Loading/></>}>
                                <PrivateRoute>
                                    <HomePage/>
                                </PrivateRoute>
                            </React.Suspense>
                        } path={"/"}/>
                        <Route element={
                            <React.Suspense fallback={<><Loading/></>}>
                                <PrivateRoute>
                                    <HomePage/>
                                </PrivateRoute>
                            </React.Suspense>
                        } path={"/home"}/>
                        <Route element={
                            <React.Suspense fallback={<><Loading/></>}>
                                <AdminRoute>
                                    <AdminPanel/>
                                </AdminRoute>
                            </React.Suspense>
                        } path={"/admin"}/>
                        <Route element={
                            <React.Suspense fallback={<><Loading/></>}>
                                <AdminRoute>
                                    <ClasseGestionPage/>
                                </AdminRoute>
                            </React.Suspense>
                        } path={"/classes"}/>
                        <Route element={
                            <React.Suspense fallback={<><Loading/></>}>
                                <AdminRoute>
                                    <ClasseForm/>
                                </AdminRoute>
                            </React.Suspense>
                        } path={"/classes/:id"}/>
                        <Route element={
                            <React.Suspense fallback={<><Loading/></>}>
                                <AdminRoute>
                                    <CompetenceGestionPage/>
                                </AdminRoute>
                            </React.Suspense>
                        } path={"/competences"}/>
                        <Route element={
                            <React.Suspense fallback={<><Loading/></>}>
                                <AdminRoute>
                                    <DonsGestionPage/>
                                </AdminRoute>
                            </React.Suspense>
                        } path={"/dons"}/>
                        <Route element={
                            <React.Suspense fallback={<><Loading/></>}>
                                <AdminRoute>
                                    <EcoleGestionPage/>
                                </AdminRoute>
                            </React.Suspense>
                        } path={"/ecoles"}/>
                        <Route element={
                            <React.Suspense fallback={<><Loading/></>}>
                                <AdminRoute>
                                    <ManifestationOccultesPage/>
                                </AdminRoute>
                            </React.Suspense>
                        } path={"/manifestations"}/>
                        <Route element={
                            <React.Suspense fallback={<><Loading/></>}>
                                <AdminRoute>
                                    <ObjetGestionPage/>
                                </AdminRoute>
                            </React.Suspense>
                        } path={"/objets"}/>
                        <Route element={
                            <React.Suspense fallback={<><Loading/></>}>
                                <AdminRoute>
                                    <RaceGestionPage/>
                                </AdminRoute>
                            </React.Suspense>
                        } path={"/races"}/>
                        <Route element={
                            <React.Suspense fallback={<><Loading/></>}>
                                <AdminRoute>
                                    <SortsGestionPage/>
                                </AdminRoute>
                            </React.Suspense>
                        } path={"/sorts"}/>
                        <Route element={
                            <React.Suspense fallback={<><Loading/></>}>
                                <AdminRoute>
                                    <UserGestionPage/>
                                </AdminRoute>
                            </React.Suspense>
                        } path={"/users"}/>

                    </Routes>
                </BrowserRouter>
            </div>
            <ToastContainer position={"bottom-right"} theme={"colored"}/>
        </AuthContext.Provider>
    );
}

export default App;
