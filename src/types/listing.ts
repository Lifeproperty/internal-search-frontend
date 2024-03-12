import {PostFormType, PostType, PropertyType} from "@/constants/property";
import {AvailabilityType} from "@/types/availability";

export interface Property {
    areaLP: string;
    areaLV: string;
    sku: string;
    propertyType: PropertyType;
    postType: PostType;
    postFrom: PostFormType;
    titleTH: string;
    titleEN: string;
    price: number;
    areaSize: number;
    floor: string;
    bedroom: string;
    bathroom: string;
    petAllowed: string;
    exclusive: string;
    facingDirection: string;
    unitNumber: string;
    buildingYear: number;
    lineId: string;
    tel: string;
    name: string;
    whatsapp: string;
    facebookMessenger: string;
    wechat: string;
    externalDataSource: string;
    feedbackChecked: string;
    listedOn: string;
    availability: AvailabilityType;
    psCode: number;
    comment: string;
    updateAvailability: string;
}

export interface ListingTable {
    dataList: Property[];
    total: number;
    offset?: number;
    limit?: number;
}

export interface LvId {
    id: string;
    sku: string;
    type: string;
}
