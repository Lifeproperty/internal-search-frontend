import {PostType, PropertyType} from "@/constants/property";

export interface SearchFormType {
    skuList: string[];
    areaLPList: string[];
    projectNameList: string[];
    propertyTypeList: PropertyType[];
    postTypeList: PostType[]
    bedRoomList: string[];
    bathroomList: string[];
    minPrice?: number;
    maxPrice?: number;
    minAreaSize?: number;
    maxAreaSize?: number;
}
