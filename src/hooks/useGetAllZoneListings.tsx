import {useQuery} from "@tanstack/react-query";
import {getAllZoneListings} from "@/services/listingsApi";

const useGetAllZoneListings = () => {
    return useQuery({
        queryKey: ["getAllZoneListings"],
        queryFn: () => getAllZoneListings()
    });
};

export default useGetAllZoneListings;
