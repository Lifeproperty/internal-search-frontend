"use client";
import {ListingTable} from "@/components/Home/ListingTable";
import {Container} from "@mui/material";
import useGetAllListings from "@/hooks/useGetAllListings";

export default function Home() {
    const {data} = useGetAllListings();

    return (
        <Container>
            <ListingTable rows={data || []}/>
        </Container>
    );
}
