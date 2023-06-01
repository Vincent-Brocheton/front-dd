import React from "react";
import Auth from "../services/Auth";
import {parties} from "../services/fakeData";
import {DateAPI} from "../services/date";

const HomePage = () => {
    const username = Auth.getUsername();
    const roles = Auth.getRoles();

    const data = parties;
    return (<>
            <h1>Bonjour, {username} !</h1>
            <p>Vous êtes connecté en tant que {roles}</p>
            {data ? <>
                        <div className="row flex-wrap justify-content-evenly mx-2 mx-md-0">
                            <h2>Vos parties en cours</h2>
                            {data.map((partie, index) =>
                                <div className="card mt-3 col-md-5" onClick={() => console.log(partie)} key={index}>
                                    <div className="card-title">
                                        Nom : {partie.nom}
                                    </div>
                                    <div className="card-text">
                                        Description : {partie.description}
                                    </div>
                                    <div className="card-text" style={{textTransform: 'capitalize'}}>
                                        Date de Création : {DateAPI.formatDate(partie.dateCreation)}
                                    </div>
                                </div>
                            )}
                        </div>

                </>
                :
                <p>Vous n'avez aucune partie en cours</p>}
        </>
    );
}

export default HomePage