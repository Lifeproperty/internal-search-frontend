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

    const searchHandler = (condition: SearchFormType) => {
        const filteredRows = data?.filter((row) => {
            let isMatch = true;
            if (condition.skuList.length > 0) {
                isMatch = isMatch && condition.skuList.includes(row.sku);
            }
            if (condition.areaLPList.length > 0) {
                isMatch = isMatch && condition.areaLPList.includes(row.areaLP);
            }
            return isMatch;
        });
        setTableRows(filteredRows || []);
    }

    return (
        <Container disableGutters={true} >
            <div className={"flex flex-col gap-2 mt-4"}>
                <SearchForm properties={data || []} onSearch={searchHandler}/>
                <ListingTable rows={tableRows} isLoading={isLoading}/>
            </div>
        </Container>
    );
}
