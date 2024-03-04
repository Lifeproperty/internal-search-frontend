import {Property} from "@/types/listing";
import Typography from "@mui/material/Typography";
import {Box, Button, Link, Tab} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {SyntheticEvent, useState} from "react";
import {ContactCopyOrLink} from "@/components/Home/ContactCopyOrLink";

interface ListingDetailProps {
    property: Property;
    onClickCopy?: (text: string) => void;
}

export const ListingDetail = ({property, onClickCopy}: ListingDetailProps) => {
    const [value, setValue] = useState("1");
    const tels: string[] = property.tel.split(",").filter(tel => !!tel);
    const lineIds: string[] = property.lineId.split(",").filter(lineId => !!lineId);
    const whatsapps: string[] = property.whatsapp.split(",").filter(whatsapp => !!whatsapp).map(whatsapp => whatsapp.replaceAll("+", "").replaceAll(" ", ""));
    const facebookMessengers: string[] = property.facebookMessenger.split(",").filter(facebookMessenger => !!facebookMessenger);
    const wechats: string[] = property.wechat.split(",").filter(wechat => !!wechat).map(wechat => wechat.replaceAll("+", "").replaceAll(" ", ""));

    const detail = () =>
        `[${property.postType}] ${property.titleEN} (${property.sku})
🚗 Near ${property.areaLP}
        
🏡 Property Type: ${property.propertyType}${property?.bedroom && property.bathroom ? `\n- Bed-Bath: ${property?.bedroom} Beds ${property.bathroom} Baths` : property?.bedroom ? `\n- Bed: ${property?.bedroom}` : property?.bathroom ? `\n- Bath: ${property?.bathroom}` : ''}${property.areaSize ? `\n- Unit Size: ${property.areaSize} sq.m.` : ''}${property.floor ? `\n- Floor: ${property.floor}` : ''}
        
💸 ${property.postType === "Rent" ? `Rental Price: ${property.price.toLocaleString()} thb/month` : `Selling Price: ${property.price.toLocaleString()} thb`}`;

    const clickCopyHandler = async (text: string) => {
        await navigator.clipboard.writeText(text);
        if (onClickCopy) onClickCopy("Copied to clipboard!");
    };

    const handleChange = (event: SyntheticEvent, newValue: string) => {
        setValue(newValue);
    };

    console.log(tels);
    return (
        <TabContext value={value}>
            <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Contact" value="1"/>
                    <Tab label="Details" value="2"/>
                </TabList>
            </Box>
            <TabPanel value="1" sx={{padding: 2}}>
                <div className={"flex flex-col"}>
                    <div className={'flex flex-row gap-2'}>
                        <Typography fontWeight={500}>
                            Name:
                        </Typography>
                        <Typography>
                            {property.name}
                        </Typography>
                    </div>
                    {tels.length > 0 && (
                        <div className={"flex flex-row gap-2"}>
                            <div>
                                <Typography fontWeight={500}>
                                    Call:
                                </Typography>
                            </div>
                            <div className={"flex flex-col"}>
                                {tels.map((tel, index) => (
                                    <Link href={`tel:${tel}`} key={index}>
                                        <Typography>
                                            {tel}
                                        </Typography>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                    {lineIds.length > 0 && (
                        <div className={"flex flex-row gap-2"}>
                            <div>
                                <Typography fontWeight={500}>
                                    Line:
                                </Typography>
                            </div>
                            <div className={"flex flex-col"}>
                                {lineIds.map((lineId, index) => (
                                    <ContactCopyOrLink key={lineId} contact={lineId} onClickCopy={clickCopyHandler}/>
                                ))}
                            </div>
                        </div>
                    )}
                    {whatsapps.length > 0 && (
                        <div className={"flex flex-row gap-2"}>
                            <div>
                                <Typography fontWeight={500}>
                                    WhatsApp:
                                </Typography>
                            </div>
                            <div className={"flex flex-col "}>
                                {whatsapps.map((whatsapp, index) => (
                                    <Link href={`https://wa.me/${whatsapp}`} key={whatsapp} target={"_blank"}>
                                        <Typography>
                                            {whatsapp}
                                        </Typography>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                    {wechats.length > 0 && (
                        <div className={"flex flex-row gap-2"}>
                            <div>
                                <Typography fontWeight={500}>
                                    Wechat:
                                </Typography>
                            </div>
                            <div className={"flex flex-col "}>
                                {whatsapps.map((whatsapp, index) => (
                                    <Link href={`weixin://dl/chat?${whatsapp}`} key={whatsapp} target={"_blank"}>
                                        <Typography>
                                            {whatsapp}
                                        </Typography>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                    {facebookMessengers.length > 0 && (
                        <div className={"flex flex-row gap-2"}>
                            <div>
                                <Typography fontWeight={500}>
                                    Facebook Messenger:
                                </Typography>
                            </div>
                            <div className={"flex flex-col "}>
                                {facebookMessengers.map((facebookMessenger, index) => (
                                    <ContactCopyOrLink key={facebookMessenger} contact={facebookMessenger} onClickCopy={clickCopyHandler}/>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </TabPanel>
            <TabPanel value="2" sx={{padding: 2}}>
                <div className={"flex flex-col items-start gap-2"}>
                    <Button variant="contained" onClick={() => clickCopyHandler(detail())}
                            endIcon={<ContentCopyIcon/>}>
                        Copy
                    </Button>
                    <Typography className={'whitespace-pre-line'} >
                        {detail()}
                    </Typography>
                </div>
            </TabPanel>

        </TabContext>

    );
};
