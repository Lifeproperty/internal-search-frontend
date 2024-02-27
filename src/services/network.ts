import axios from "axios";
import {baseUrl} from "@/constants/environment";

export const authAxios = () => {
    const accessToken = typeof localStorage !== 'undefined' ? localStorage.getItem("accessToken") : "";
    return axios.create({
        baseURL: baseUrl,
        headers: {
            "Authorization": `Bearer ${accessToken}`
        }
    });
}
