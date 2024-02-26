import {useQuery} from "@tanstack/react-query";
import {getImagesFromSku} from "@/services/listingsApi";

interface useGetImagesFromSkuProps {
    sku: string;
    limit?: number;
}

const useGetImagesFromSku = ({sku, limit}: useGetImagesFromSkuProps) => {
    return useQuery({
        queryKey: [sku, limit],
        queryFn: ({queryKey}) => getImagesFromSku(sku, limit),
        staleTime: Infinity,
    });
};

export default useGetImagesFromSku;
