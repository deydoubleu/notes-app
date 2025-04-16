import databaseService from "./databaseService";
import { ID , Query } from "react-native-appwrite";


//Appwrite database and Collection IDs
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID;
const colId = process.env.EXPO_PUBLIC_APPWRITE_COL_NOTES_ID;

//Notes service
const noteService = {
    //Get Notes
    async getNotes (user_id) {
        if (!user_id) {
            console.error("User ID is required to fetch notes");
            return {data: [], error: "No user ID provided"};
        }

        const response = await databaseService.listDocuments(dbId, colId, [
            Query.equal("user_id", user_id),
        ]);
        if (response.error) {
            return {error: response.error}
        }
        return {data: response.data};
    },

    // Add Note
    async addNote (user_id, text) {
        if (!text){
            return {error: "Note Text cannot be empty"};
        }

        const data = {
            text: text,
            createdAt: new Date().toISOString(),
            user_id: user_id
        }

        const response = await databaseService.createDocument(
            dbId,
            colId,
            data,
            ID.unique()
        );

        if (response?.error) {
            return {error: response.error};
        }
        return {data: response};
    },

    // Update Note
    async updateNote (id, text){
        const response = await databaseService.updateDocument(dbId, colId, id, 
            { text }
        );
        if (response?.error) {
            return {error: response.error};
        }
        return {data: response};
    },

    // Delete Note
    async deleteNote (id){
        const response = await databaseService.deleteDocument(dbId, colId, id);
        if (response?.error) {
            return {error: response.error};
        }
        return {success: true};
    }
    
 };

export default noteService;