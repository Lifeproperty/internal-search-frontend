import {useQuery} from "@tanstack/react-query";
import {getAllListings} from "@/services/listingsApi";

const useGetAllListings = () => {
    return useQuery({
        queryKey: ['getAllListings'],
        queryFn: () => getAllListings()
    });
};

export default useGetAllListings;
