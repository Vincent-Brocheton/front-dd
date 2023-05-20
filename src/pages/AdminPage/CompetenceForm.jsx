import React, {useEffect, useState} from "react";
import {useParams} from "react-router";
import {CompetenceAPI} from "../../services/CompetenceAPI";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import AdminHeader from "../../components/AdminHeader";
import Field from "../../components/Form/Field";
import Select from "../../components/Form/Select";

const CompetenceForm = () => {
    const {id = "new"} = useParams();
    const [edit, setEdit] = useState(id !== "new");
    const [competence, setCompetence] = useState({nom: "", stat: ""});
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState({nom: "", stat: ""});
    const navigate = useNavigate();
    const handleChange = (event) => {
        const {name, value} = event.currentTarget;
        setCompetence({...competence, [name]: value});
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            if (edit) {
                // call the API to update the data
                await CompetenceAPI.update(id, competence);
                toast.success("La compétence a bien été modifiée")

            } else {
                // call the API to create the data
                await CompetenceAPI.create(competence);
                toast.success("La compétence a bien été créée")
            }
            navigate("/competences")
        }catch (e) {
            console.log(e.response);
            let violations = e.response.data.violations;
            if (violations) {
                violations.forEach(violation => {
                    setErrors((errors) => ({...errors, [violation.propertyPath]: violation.message}));
                    toast.error(violation.message);
                })
            }

        }
    }
    //fetch the data from the API
    const fetchData = async () => {
        try {
            const data = await CompetenceAPI.findOne(id);
            const {nom, stat} = data;
            setCompetence({nom, stat});
        } catch (error) {
            console.log(error.response);
            toast.error("Une erreur est survenue");
        }
    }
    useEffect(() => {
        if(edit){
            // fetch data from API
            fetchData().then(() => setLoading(false));
        }
    }, [id]);

    const stats = [
        {id: "FOR", nom: "Force"},
        {id: "DEX", nom: "Dextérité"},
        {id: "CON", nom: "Constitution"},
        {id: "INT", nom: "Intelligence"},
        {id: "SAG", nom: "Sagesse"},
        {id: "CHA", nom: "Charisme"},
    ];

    return (
        <>
            <AdminHeader text={edit ? "Modification d'une compétence" : "Création d'une compétence"} link="/competences" returnText={"Retour aux Compétences"}/>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <Field name="nom" label="Nom" placeholder="Nom de la compétence" value={competence.nom} onChange={handleChange} error={errors.nom} required={true}/>
                            </div>
                            <div className="mb-3">
                                <Select name="stat" label="Stat" value={competence.stat} onChange={handleChange} error={errors.stat} required={true}>
                                    <option value="">Choisissez un stat</option>
                                    {stats.map(stat => <option key={stat.id} value={stat.id}>{stat.nom}</option>)}
                                </Select>
                            </div>
                            <div className="mb-3">
                                <button type="submit" className="btn btn-primary">{edit ? "Modifier" : "Créer"} la compétence</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </>
    );
}

export default CompetenceForm;