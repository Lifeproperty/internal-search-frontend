import {authAxios} from "@/services/network";
import {PropertyType} from "@/constants/property";
import {Property} from "@/types/listing";

const baseListingsUrl = "/api/ps";

export const getAvailableFromPsCode = async (psCode: number) => {
    const response = await authAxios().get<{
        data: Pick<Property, "availability" | "comment">;
    }>(`${baseListingsUrl}/available/${psCode}`);
    return response.data.data;
};

