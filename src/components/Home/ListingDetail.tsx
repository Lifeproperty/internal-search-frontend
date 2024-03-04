import {MRT_Row} from "material-react-table";
import {Property} from "@/types/listing";
import Typography from "@mui/material/Typography";
import {Box, Button, Divider, Link, Tab} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import {SyntheticEvent, useState } from "react";

interface ListingDetailProps {
    property: Property;
    onClickCopy?: (text: string) => void;
}

export const ListingDetail = ({property, onClickCopy}: ListingDetailProps) => {
    const [value, setValue] = useState('1');
    const tels: string[] = property.tel.split(",").filter(tel => !!tel);
    const lineIds: string[] = property.lineId.split(",").filter(lineId => !!lineId);

    const detail = () =>
        `[${property.postType}] ${property.titleEN} (${property.sku})
🚗 Near ${property.areaLP}
        
🏡 Property Type: ${property.propertyType}
- Bed-Bath: ${property.bedroom} Beds ${property.bathroom} Baths
- Unit Size: ${property.areaSize} sq.m.
- Floor: ${property.floor}
        
💸 ${property.postType === "Rent" ? `Rental Price: ${property.price.toLocaleString()} thb/month` : `Selling Price: ${property.price.toLocaleString()} thb`}`;

    const clickCopyHandler = async (text: string) => {
        await navigator.clipboard.writeText(text);
        if (onClickCopy) onClickCopy("Copied to clipboard!");
    };

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    console.log(tels)
    return (
        <TabContext value={value} >
            <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Contact" value="1"/>
                    <Tab label="Details" value="2"/>
                </TabList>
            </Box>
            <TabPanel value="1" sx={{padding: 2}}>
                <div className={'flex flex-col'}>
                    <div>
                        Name: {property.name}
                    </div>
                    {tels.length > 0 && (
                        <div className={"flex flex-row gap-2"}>
                            <div>
                                Call:
                            </div>
                            <div className={"flex flex-col "}>
                                {tels.map((tel, index) => (
                                    <Link href={`tel:${tel}`} key={index}>
                                        {tel}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                    {lineIds.length > 0 && (
                        <div className={"flex flex-row gap-2"}>
                            <div>
                                Line:
                            </div>
                            <div className={"flex flex-col "}>
                                {lineIds.map((lineId, index) => (
                                    <Link href={`https://line.me/R/ti/p/${lineId}`} target={'_blank'} key={index}>
                                        {lineId}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                    <div>
                        FB:
                    </div>
                </div>
            </TabPanel>
            <TabPanel value="2"  sx={{padding: 2}}>
                <div className={"flex flex-col items-start gap-2"}>
                    <Button variant="contained" onClick={() => clickCopyHandler(detail())}
                            endIcon={<ContentCopyIcon/>}>
                        Copy
                    </Button>
                    <div className={"whitespace-pre"}>
                        {detail()}
                    </div>
                </div>
            </TabPanel>

        </TabContext>

    );
};
