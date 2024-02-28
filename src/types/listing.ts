import {PostType, PropertyType} from "@/constants/property";

export interface Property {
    areaLP: string;
    areaLV: string;
    sku: string;
    propertyType: PropertyType;
    postType: PostType;
    postFrom: string;
    titleTH: string;
    titleEN: string;
    price: number;
    areaSize: number;
    floor: string;
    bedroom: string;
    bathroom: string;
    petAllowed: string;
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
    availability: string;
    psCode: number;
}

export interface ListingTable {
    dataList: Property[];
    total: number;
    offset?: number;
    limit?: number;
}
