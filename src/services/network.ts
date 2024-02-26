import axios from "axios";
import {baseUrl} from "@/constants/environment";

const accessToken = typeof localStorage !== 'undefined' ? localStorage.getItem("accessToken") : "";
export const authAxios = axios.create({
    baseURL: baseUrl,
    headers: {
        "Authorization": `Bearer ${accessToken}`
    }
});
