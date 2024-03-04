"use client";
import {ListingTable} from "@/components/Home/ListingTable";
import {Container} from "@mui/material";
import useGetAllListings from "@/hooks/useGetAllListings";
import {SearchForm} from "@/components/Home/SearchForm";
import {SearchFormType} from "@/types/searchForm";
import {useEffect, useState} from "react";
import {Property} from "@/types/listing";

export default function Home() {
    const {data, isLoading} = useGetAllListings();
    const [tableRows, setTableRows] = useState<Property[]>([]);

    useEffect(() => {
        setTableRows(data || []);
    }, [data]);

    // เพิ่มใน internal search
    // -เติม ปุ่ม pet allow , exclusive
    // -stamp time : update within 7 days/ 30days / anytime
    // -ปุ่ม drop down status หลังโทรเสร็จ (available/not available/cannot reach

    const searchHandler = (condition: SearchFormType) => {
        const filteredRows = data?.filter((row) => {
            let isMatch = true;
            if (condition.projectNameList.length > 0) {
                isMatch = isMatch && condition.projectNameList.includes(row.titleEN);
            }
            if (condition.skuList.length > 0) {
                isMatch = isMatch && condition.skuList.includes(row.sku);
            }
            if (condition.areaLPList.length > 0) {
                isMatch = isMatch && condition.areaLPList.includes(row.areaLP);
            }
            if (condition.postTypeList.length > 0) {
                isMatch = isMatch && condition.postTypeList.includes(row.postType);
            }
            if (condition.propertyTypeList.length > 0) {
                isMatch = isMatch && condition.propertyTypeList.includes(row.propertyType);
            }
            if (condition.bedRoomList.length > 0) {
                if (condition.bedRoomList.includes("3")) {
                    isMatch = isMatch && !isNaN(Number(row.bedroom)) && (+row.bedroom) >= 3;
                } else {
                    isMatch = isMatch && condition.bedRoomList.includes(row.bedroom);
                }
            }
            if (condition.bathroomList.length > 0) {
                if (condition.bathroomList.includes("3")) {
                    isMatch = isMatch && !isNaN(Number(row.bathroom)) && (+row.bathroom) >= 3;
                } else {
                    isMatch = isMatch && condition.bathroomList.includes(row.bathroom);
                }
            }
            if (condition.postFormTypeList.length > 0) {
                isMatch = isMatch && condition.postFormTypeList.includes(row.postFrom);
            }
            if (condition.areaLVList.length > 0) {
                const splitAreaLV = row.areaLV.split(", ");
                isMatch = isMatch && condition.areaLVList.some(areaLV => splitAreaLV.includes(areaLV));
            }
            if (condition.minPrice) {
                isMatch = isMatch && condition.minPrice <= row.price;
            }
            if (condition.maxPrice) {
                isMatch = isMatch && condition.maxPrice >= row.price;
            }
            if (condition.minAreaSize) {
                isMatch = isMatch && condition.minAreaSize <= row.areaSize;
            }
            if (condition.maxAreaSize) {
                isMatch = isMatch && condition.maxAreaSize >= row.areaSize;
            }
            return isMatch;
        });
        setTableRows(filteredRows || []);
    };

    return (
        <Container disableGutters={true}>
            <div className={"flex flex-col gap-2 mt-4"}>
                <SearchForm properties={data || []} onSearch={searchHandler}/>
                <ListingTable rows={tableRows} isLoading={isLoading}/>
            </div>
        </Container>
    );
}
