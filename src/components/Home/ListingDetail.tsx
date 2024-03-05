import {Property} from "@/types/listing";
import {Box, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {SyntheticEvent, useState} from "react";
import PropertyContact from "@/components/Home/PropertyContact";
import {PropertyDetail} from "@/components/Home/PropertyDetail";
import {PropertyStatus} from "@/components/Home/PropertyStatus";
import {QueryObserverResult, RefetchOptions} from "@tanstack/query-core";

interface ListingDetailProps {
    property: Property;
    onClickCopy?: (text: string) => void;
    refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<Property[], Error>>;
}

export const ListingDetail = ({property, onClickCopy, refetch}: ListingDetailProps) => {
    const [value, setValue] = useState("1");


    const clickCopyHandler = async (text: string) => {
        await navigator.clipboard.writeText(text);
        if (onClickCopy) onClickCopy("Copied to clipboard!");
    };

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    return (
        <TabContext value={value}>
            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Contact" value="1"/>
                    <Tab label="Details" value="2"/>
                    <Tab label="Status" value="3"/>
                </TabList>
            </Box>
            <TabPanel value="1" sx={{padding: 2}}>
                <PropertyContact property={property} onClickCopy={clickCopyHandler}/>
            </TabPanel>
            <TabPanel value="2" sx={{padding: 2}}>
                <PropertyDetail property={property} onClickCopy={clickCopyHandler}/>
            </TabPanel>
            <TabPanel value="3" sx={{padding: 2}}>
                <PropertyStatus property={property} refetch={refetch}/>
            </TabPanel>
        </TabContext>
    );
};
