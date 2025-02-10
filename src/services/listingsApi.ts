import {authAxios} from "@/services/network";
import {LvId, Property} from "@/types/listing";
import {ImageListType} from "@/types/imageSchema";

const baseListingsUrl = "/api/listings";

export const getAllListings = async () => {
    const response = await authAxios().get<{ data: Property[] }>(`${baseListingsUrl}/all`);
    return response.data.data;
};

export const getAllLvId = async () => {
    const response = await authAxios().get<{ data: LvId[] }>(`${baseListingsUrl}/lvId/all`);
    return response.data.data;
};

export const getAllZoneListings = async () => {
    const response = await authAxios().get<{ data: String[] }>(`${baseListingsUrl}/zone/all`);
    return response.data.data;
};

export const getImagesFromSku = async (sku: string, limit?: number) => {
    const response = await authAxios().get<ImageListType>(`${baseListingsUrl}/images/${sku}`, {
        params: {
            limit,
        },
    });
    return response.data.files;
};

export const updateListing = async (postType: string, sku: string, data: Partial<Property>) => {
    const response = await authAxios().put<{ data: Property }>(`${baseListingsUrl}/${postType}/${sku}`, data);
    return response.data.data;
};

export const deleteListing = async (postType: string, sku: string) => {
    const response = await authAxios().delete<{ status: boolean }>(`${baseListingsUrl}/${postType}/${sku}`);
    return response.data;
};
