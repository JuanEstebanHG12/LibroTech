import axios from "axios";
import {refreshAccessToken} from "./auth"

import { ENV } from "../utils";

//Crear una instancia de axios con la configuración base
const axiosClient = axios.create({
    baseURL: ENV.BASE_API,
    headers: {
        "Content-Type": "application/json",
    },
});

//INTERCEPTOR DE PETICIONES: Inyectar el token de acceso en cada petición si existe
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

//INTERCEPTOR DE RESPUESTAS: Manejar errores globales de la API
axiosClient.interceptors.response.use(
    (response) => response, //Si la respuesta es exitosa, simplemente devolverla
    async (error) => {
        const originalRequest = error.config; // Guardar la petición original para reintentos si es necesario

        const isLoginRequest = originalRequest.url?.includes(ENV.API_ROUTES.LOGIN);
        // Aquí puedes manejar errores globales, como redirigir al login si el token ha expirado
        if (error.response?.status === 401 && !originalRequest._retry && !isLoginRequest) {
            originalRequest._retry = true; // Marcar la petición como reintentada para evitar bucles infinitos

            try {
                // Pedimos un nuevo access token usando el refresh token                                                           
                const newAccessToken = await refreshAccessToken();


                // Actualizamos el header de la petición que falló y la reintentamos                                              
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return axiosClient(originalRequest);
            } catch (refreshError) {
                // Si el refresh token también falló o expiró, limpiamos sesión y mandamos al login                               
                localStorage.removeItem(ENV.JWT.ACCESS);
                localStorage.removeItem(ENV.JWT.REFRESH);
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosClient;