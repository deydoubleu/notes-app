import { account } from "./appwrite";
import { ID } from "react-native-appwrite";

const authService = {
    // Register a new user
    async register (email, password) {
        try {
            const response = await account.create(ID.unique(), email, password);
            return response;
        } catch (error) {
            return {error: error.message || "Registration failed"};
        }
    },

    // Login a user
    async login (email, password) {
        try {
            const response = await account.createEmailPasswordSession(email, password);
            return response;
        } catch (error) {
            return {error: error.message || "Login failed"};
        }
    },
    
    // Get logedin user
    async getUser () {
        try{
            return await account.get();
        } catch (error) {
            return null;
        }
    },

    // Logout a user
    async logout () {
        try{
            await account.deleteSession("current");
            return true;
        } catch (error) {
            return {error: error.message || "Logout failed"};
        }
    }
}

export default authService;