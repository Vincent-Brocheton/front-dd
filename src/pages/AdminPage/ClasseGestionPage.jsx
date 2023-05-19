import React, {useEffect, useState} from 'react';
import DataTable from 'react-data-table-component';
import {ClasseAPI} from "../../services/ClasseAPI";
import Loading from "../../components/Loading/Loading";
import {Add, Delete, Edit} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";
import {Tooltip} from "@mui/material";
import {Button, Modal} from "react-bootstrap";
import ReturnButton from "../../components/ReturnButton/ReturnButton";
import AdminHeader from "../../components/AdminHeader";

// create a component called ClasseGestionPage which used react-data-table-component to view, edit, delete, and add classes


const ClasseGestionPage = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [modal, setModal] = useState(false);
    const [classe, setClasse] = useState({});

    const columns = [
        {
            name: 'Nom de la classe',
            selector: (row) => row.nom,
            sortable: true,
            style: {
                fontWeight: 'bold'
            },
            center: true
        },
        {
            name: 'Description',
            selector: (row) => row.description,
            sortable: false,
            center: true
        },
        {
            name: 'Actions',
            cell: (row) => <div className="d-flex justify-content-around">
                <Link to={`/classes/${row.id}`} className="nav-link">
                    <Tooltip title={"Editer la classe"} placement={"top"}>
                        <Edit color="primary"/>
                    </Tooltip>
                </Link>
                <Tooltip title={"Supprimer la classe"} placement={"top"}>
                    <Delete color="error" onClick={() => {
                        setClasse(row);
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
            <AdminHeader link="/admin" returnText="Retour au Panel d'Administration" text="Gestion des classes"/>
            {loading && <Loading/>}
            {!loading && <>
                <div className="d-flex justify-content-end">
                    <Link to={"/classes/new"} className="btn btn-primary"><Add/>Ajouter une classe</Link>
                </div>
                <DataTable
                    columns={columns}
                    data={data}
                    noDataComponent={"Aucune Classe trouvées"}
                    pagination={true}
                    paginationPerPage={5}
                    paginationRowsPerPageOptions={[5, 10, 15]}
                    paginationComponentOptions={{
                        rowsPerPageText: 'Classes par page:',
                        rangeSeparatorText: 'sur',
                    }}
                    highlightOnHover={true}
                    pointerOnHover={true}
                    striped={true}
                    responsive={true}
                    onRowClicked={(row) => {
                        navigate(`/classes/${row.id}`)
                    }}
                />
            </>

            }

            <Modal show={modal} onHide={() => setModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Suppression d'une classe</Modal.Title>
                </Modal.Header>
                <Modal.Body>Êtes-vous sûr de vouloir supprimer la classe {classe.nom} ?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDelete}>
                        Supprimer la classe
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
}

export default ClasseGestionPage;
