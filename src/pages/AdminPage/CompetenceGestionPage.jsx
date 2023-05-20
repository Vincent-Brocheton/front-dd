import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {Tooltip} from "@mui/material";
import {Add, Delete, Edit} from "@mui/icons-material";
import {ClasseAPI} from "../../services/ClasseAPI";
import {CompetenceAPI} from "../../services/CompetenceAPI";
import AdminHeader from "../../components/AdminHeader";
import Loading from "../../components/Loading/Loading";
import DataTable from "react-data-table-component";
import {Button, Modal} from "react-bootstrap";

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
        const response = await CompetenceAPI.findAll();
        setData(response);
        setLoading(false);

    }

    const handleDelete = async () => {
        try {
            await CompetenceAPI.delete(competence.id);
            setModal(false);
            setCompetence({})
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
            <AdminHeader link="/admin" returnText="Retour au Panel d'Administration" text="Gestion des compétences"/>
            {loading && <Loading/>}
            {!loading && <>
                <div className="d-flex justify-content-end">
                    <Link to={"/competences/new"} className="btn btn-primary"><Add/>Ajouter une Compétence</Link>
                </div>
                <DataTable
                    columns={columns}
                    data={data}
                    noDataComponent={"Aucune Compétences trouvées"}
                    pagination={true}
                    paginationPerPage={5}
                    paginationRowsPerPageOptions={[5, 10, 15]}
                    paginationComponentOptions={{
                        rowsPerPageText: 'Compétences par page:',
                        rangeSeparatorText: 'sur',
                    }}
                    highlightOnHover={true}
                    pointerOnHover={true}
                    striped={true}
                    responsive={true}
                    onRowClicked={(row) => {
                        navigate(`/competences/${row.id}`)
                    }}
                />
            </>

            }

            <Modal show={modal} onHide={() => setModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Suppression d'une compétence</Modal.Title>
                </Modal.Header>
                <Modal.Body>Êtes-vous sûr de vouloir supprimer la compétence {competence.nom} ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModal(false)}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Supprimer la Compétence
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};

export default CompetenceGestionPage;
