import {authAxios} from "@/services/network";

const baseListingsUrl = "/api/listings";

export const getAllListings = async () => {
    const response = await authAxios().get(`${baseListingsUrl}/all`);
    return response.data.data;
};


export const getImagesFromSku = async (sku: string, limit?: number) => {
    const response = await authAxios().get(`${baseListingsUrl}/images/${sku}`, {
        params: {
            limit,
        },
    });
    return response.data.files;
};
