import {useQuery} from "@tanstack/react-query";
import {QueryKey} from "@/constants/queryKey";
import {getAllLvId} from "@/services/listingsApi";

const useGetAllLvId = () => {
    return useQuery({
        queryKey: [QueryKey.GetAllLvId],
        queryFn: () => getAllLvId()
    });
};

export default useGetAllLvId;
