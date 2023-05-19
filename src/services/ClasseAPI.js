import {API_CLASSES} from "./config";
import axios from "axios";

// make CRUD to API for Classe entity (see Symfony API Platform)
export class ClasseAPI {

        // Get all Classes
        static async findAll() {
            return await axios.get(API_CLASSES)
                .then(response => response.data['hydra:member']);
        }

        // Get one Classe by id
        static async findOne(id) {
            return await axios.get(API_CLASSES+"/"+id)
                .then(response => response.data);
        }

        // Create a new Classe
        static async create(classe) {
            return await axios.post(API_CLASSES, classe);
        }

        // Update a Classe
        static async update(id, classe) {
            return await axios.put(API_CLASSES+"/"+id, classe);
        }

        // Delete a Classe
        static async delete(id) {
            return await axios.delete(API_CLASSES+"/"+id);
        }
}