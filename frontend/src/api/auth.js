import axiosClient from "./axiosClient";
import {ENV} from "../utils";
import axios from "axios";

export const login = async (email, password) => {
    try {
        const response = await axiosClient.post(ENV.API_ROUTES.LOGIN, { email, password });
        const { token, refreshToken } = response.data;

        // Guardar los tokens en localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("refreshToken", refreshToken);

        return response.data;
    } catch (error) {
        throw error;
    }
};

export const refreshAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No hay refresh token");

        const response = await axios.post(`${ENV.BASE_API}/${ENV.API_ROUTES.REFRESH_ACCES_TOKEN}`, { refreshToken });
        const { token } = response.data;

        // Guardar el nuevo access token en localStorage
        localStorage.setItem("token", token);

        return token;
    } catch (error) {
        throw error;
    }

}
export const getMe = async () => {                                                                                        
    const response = await axiosClient.get(ENV.API_ROUTES.USERS.USER_ME);                                                       
    return response.data;                                                                                                 
};                          