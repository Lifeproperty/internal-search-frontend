import {useQuery} from "@tanstack/react-query";
import {getAllListings} from "@/services/listingsApi";
import {QueryKey} from "@/constants/queryKey";

const useGetAllListings = () => {
    return useQuery({
        queryKey: [QueryKey.GetAllListings],
        queryFn: () => getAllListings(),
        staleTime: Infinity,
    });
};

export default useGetAllListings;
