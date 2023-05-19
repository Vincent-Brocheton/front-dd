import {API_COMPETENCES} from "./config";
import axios from "axios";

// make CRUD to API for Competence entity (see Symfony API Platform)
export class CompetenceAPI {

    // Get all Competences
    static async findAll() {
        return await axios.get(API_COMPETENCES)
            .then(response => response.data['hydra:member']);
    }

    // Get one Competence by id
    static async findOne(id) {
        return await axios.get(API_COMPETENCES + "/" + id)
            .then(response => response.data);
    }

    // Create a new Competence
    static async create(competence) {
        return await axios.post(API_COMPETENCES, competence);
    }

    // Update a Competence
    static async update(id, competence) {
        return await axios.put(API_COMPETENCES + "/" + id, competence);
    }

    // Delete a Competence
    static async delete(id) {
        return await axios.delete(API_COMPETENCES + "/" + id);
    }
}