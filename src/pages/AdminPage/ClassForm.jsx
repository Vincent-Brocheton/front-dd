import React, {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {ClasseAPI} from "../../services/ClasseAPI";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import Field from "../../components/Form/Field";
import FieldTextArea from "../../components/Form/FieldTextArea";
import ReturnButton from "../../components/ReturnButton/ReturnButton";
import AdminHeader from "../../components/AdminHeader";

const ClasseForm = () => {
    // get the id from the url
    const {id} = useParams();
    const [classe, setClasse] = useState({nom: "", description: ""});
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({nom: "", description: ""});
    const [edit,setEdit] = useState(false);
    const navigate = useNavigate();
    const handleChange = (event) => {
        const {name, value} = event.currentTarget;
        setClasse({...classe, [name]: value});
    }
    // fetch the data from the API
    const fetchData = async () => {
        try {
            const data = await ClasseAPI.findOne(id);
            const {nom, description} = data;
            setClasse({nom, description});
        } catch (error) {
            console.log(error.response);
            toast.error("Une erreur est survenue");
        }
    }
    // handle the submit
    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            if (edit) {
                // call the API to update the data
                await ClasseAPI.update(id, classe);
                toast.success("La classe a bien été modifiée")
            } else {
                // call the API to create the data
                await ClasseAPI.create(classe);
                toast.success("La classe a bien été créée")
            }
            navigate("/classes")
        } catch ({response}) {
            let violations = response.data.violations;
            if (violations) {
                violations.forEach(violation => {
                    setErrors((errors) => ({...errors, [violation.propertyPath]: violation.message}));
                    toast.error(violation.message);
                })
            }
        }
    }

    useEffect(() => {
        if (id !== "new") {
            setEdit(true);
            // fetch the data from the API
            fetchData().then(r => '');
        }
    }, [id]);

    return (
        <div>
            <AdminHeader text={edit ? "Modification d'une classe" : "Création d'une classe"} link="/classes" returnText={"Retour aux Classes"}  />

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <Field name="nom" label="Nom de la classe" value={classe.nom} onChange={handleChange} error={errors.nom}/>
                </div>
                <div className="mb-3">
                    <FieldTextArea name="description" label="Description" value={classe.description} onChange={handleChange} error={errors.description}/>
                </div>
                <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">{edit ? "Modifier" : "Créer"} la classe</button>
                </div>
            </form>
        </div>
    );
};

export default ClasseForm;
