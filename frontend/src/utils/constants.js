const SERVER_IP = "localhost:8080";

export const ENV = {
    BASE_PATH: `http://${SERVER_IP}`,
    BASE_API: `http://${SERVER_IP}/api/v1`,
    //RUTAS DE LOS ENDPOINTS
    API_ROUTES: {
        LOGIN: "auth/login",
        REFRESH_ACCES_TOKEN: "auth/refresh-token",
        USERS: {
            USER_ME: "user/me",
        }
    },
    JWT: {
        ACCESS: "token",
        REFRESH: "refreshToken"
    }
}