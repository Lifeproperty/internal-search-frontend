import {PostFormType, PostType, PropertyType} from "@/constants/property";

export interface SearchFormType {
    skuList: string[];
    areaLPList: string[];
    areaLVList: string[];
    projectNameList: string[];
    propertyTypeList: PropertyType[];
    postTypeList: PostType[]
    postFormTypeList: PostFormType[];
    bedRoomList: string[];
    bathroomList: string[];
    minPrice?: number;
    maxPrice?: number;
    minAreaSize?: number;
    maxAreaSize?: number;
}
