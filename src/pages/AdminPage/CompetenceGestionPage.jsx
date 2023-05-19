import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Tooltip} from "@mui/material";
import {Delete, Edit} from "@mui/icons-material";
import {ClasseAPI} from "../../services/ClasseAPI";

const CompetenceGestionPage = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const [competence, setCompetence] = useState({});

    const columns = [
        {
            name: 'Nom de la compétence',
            selector: (row) => row.nom,
            sortable: true,
            style: {
                fontWeight: 'bold'
            },
            center: true
        },
        {
            name: 'Statistique Associé',
            selector: (row) => row.stat,
            sortable: false,
            center: true
        },
        {
            name: 'Actions',
            cell: (row) => <div className="d-flex justify-content-around">
                <Link to={`/competences/${row.id}`} className="nav-link">
                    <Tooltip title={"Editer la compétence"} placement={"top"}>
                        <Edit color="primary"/>
                    </Tooltip>
                </Link>
                <Tooltip title={"Supprimer la compétence"} placement={"top"}>
                    <Delete color="error" onClick={() => {
                        setCompetence(row);
                        setModal(true);
                    }
                    }/>
                </Tooltip>
            </div>,
            center: true
        }];

    // fetch data from API
    const getData = async () => {
        const response = await ClasseAPI.findAll();
        setData(response);
        setLoading(false);

    }

    const handleDelete = async () => {
        try {
            await ClasseAPI.delete(classe.id);
            setModal(false);
            setClasse({})
            getData().then(r => '');
        } catch (e) {
            console.log(e.response);
        }
    }

    useEffect(() => {
        getData().then(r => '');
    }, []);
    return (
        <div>

        </div>
    );
};

export default CompetenceGestionPage;
