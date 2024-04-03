import {LvId, Property} from "@/types/listing";
import {Box, Tab} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {SyntheticEvent, useState} from "react";
import PropertyContact from "@/components/Home/PropertyContact";
import {PropertyDescription} from "@/components/Home/PropertyDescription";
import {PropertyStatus} from "@/components/Home/PropertyStatus";

interface ListingDetailProps {
    property: Property;
    onClickCopy?: (text: string) => void;
}

export const ListingDetail = ({property, onClickCopy}: ListingDetailProps) => {
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
                    <Tab label="Description" value="1"/>
                    <Tab label="Contact" value="2"/>
                    <Tab label="Status" value="3"/>
                </TabList>
            </Box>

            <TabPanel value="1" sx={{padding: 2}}>
                <PropertyDescription property={property} onClickCopy={clickCopyHandler}/>
            </TabPanel>
            <TabPanel value="2" sx={{padding: 2}}>
                <PropertyContact property={property} onClickCopy={clickCopyHandler}/>
            </TabPanel>
            <TabPanel value="3" sx={{padding: 2}}>
                <PropertyStatus property={property}/>
            </TabPanel>
        </TabContext>
    );
};
