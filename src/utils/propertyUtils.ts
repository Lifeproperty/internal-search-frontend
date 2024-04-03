import {Property} from "@/types/listing";
import {QueryKey} from "@/constants/queryKey";
import {QueryClient} from "@tanstack/react-query";

export const updateOldCache = (queryClient: QueryClient, response: Property) => {
    queryClient.setQueryData([QueryKey.GetAllListings], (oldData: Property[] | undefined) => {
        if (oldData) {
            return oldData.map((item) => {
                if (item.sku === response.sku && item.postType === response.postType) {
                    return response;
                }
                return item;
            });
        }
        return oldData;
    });
};
