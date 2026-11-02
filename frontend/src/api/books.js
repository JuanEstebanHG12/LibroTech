import axiosClient from "./axiosClient";
import {ENV} from "../utils";

export const getBooks = async (filters = {}) => {
    try {
        const response = await axiosClient.get(ENV.API_ROUTES.BOOKS.GET_BOOKS, { params: {
            search: filters.search || '',
            category: filters.category || '',
            genre: filters.genre || ''
        } });
        return response.data;
    } catch (error) {
        throw error;
    }
}