import axios from "axios";
import AppStorage from "@/lib/storage.jsx";
import {AUTH_TOKEN} from "@/constants/storage.jsx";

const envApiUrl = import.meta.env.VITE_API_URL;

const Instance = axios.create({
    baseURL: `${envApiUrl}/api`
});

Instance.interceptors.request.use(
    async (config) => {
        const token = await AppStorage.GetItem(AUTH_TOKEN);
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)


const Api = {
    Instance
}

export default Api;
