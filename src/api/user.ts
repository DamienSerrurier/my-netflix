// import axios from "axios"
import type { IUser } from "../interfaces/user";


// const url = 'url to API user register route';

export const registerUser = async (body: IUser) => {
    console.log('registerUser', body);

    // try {
    //     const responseFromServer = await axios.post(url, body, {
    //         headers: {
    //             "Content-Type": "application/json"
    //         }
    //     });
    
    //     if (responseFromServer.status === 201) {
    //         return responseFromServer;
    //     } else {
    //         throw new Error("Erreur lors de l'inscription");
    //     }
    // } catch (error) {
    //     console.error("Une erreur est survenu: ", error);
    // }
    return {status: 201, body};
}