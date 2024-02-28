import axios from "axios";
import {baseUrl} from "@/constants/environment";
import {getAccessToken} from "@/utils/tokenUtils";

export const authAxios = () => {
    return axios.create({
        baseURL: baseUrl,
        headers: {
            "Authorization": `Bearer ${getAccessToken()}`
        }
    });
}
