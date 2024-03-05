import {PostFormType, PostType, PropertyType, UpdateAvailabilityType} from "@/constants/property";
import {AvailabilityType} from "@/types/availability";

export interface SearchFormType {
    skuList: string[];
    areaLPList: string[];
    areaLVList: string[];
    projectNameList: string[];
    propertyTypeList: PropertyType[];
    postTypeList: PostType[]
    postFormTypeList: PostFormType[];
    availabilityList: AvailabilityType[];
    updateAvailability: UpdateAvailabilityType | null;
    bedRoomList: string[];
    bathroomList: string[];
    minPrice: number | null;
    maxPrice: number | null;
    minAreaSize: number | null;
    maxAreaSize: number | null;
    petAllowed: boolean;
    exclusive: boolean;
}
