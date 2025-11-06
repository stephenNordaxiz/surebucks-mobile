import axios from "axios";

import { User } from "../types/user";
import { endpoints } from "../constants/Sizes";
import { handleError } from "../utils/handleError";

type DataRes = {data: User}

export const registerUser = async( first_name: string, last_name: string, email: string, password: string ) => {
    try {
        const {data}: DataRes = await axios.post(endpoints.register, {email, first_name, last_name, password})
        if (data) return data
        return null;
    } catch (error) {
        handleError(error)
    }
}

export const loginUser = async( email: string, password: string ) => {
    
    try {
        const {data}: DataRes = await axios.post(endpoints.login, {
            email, password
        })
        if (data) return data
        return null;
    } catch (error) {
        handleError(error)
    }
}
export const forgotPassword = async( email: string ) => {
    
    try {
        const {data} = await axios.put(endpoints.forgotPassword, {
            email
        })
        if (data) return data
        return null;
    } catch (error) {
        handleError(error)
    }
}

