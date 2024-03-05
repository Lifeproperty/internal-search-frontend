import React from "react";
import Typography from "@mui/material/Typography";
import {Link} from "@mui/material";
import {ContactCopyOrLink} from "@/components/Home/ContactCopyOrLink";
import {Property} from "@/types/listing";

interface PropertyContactProps {
    property: Property;
    onClickCopy: (text: string) => void;
}

const PropertyContact = ({property, onClickCopy}: PropertyContactProps) => {
    const tels: string[] = property.tel.split(",").filter(tel => !!tel);
    const lineIds: string[] = property.lineId.split(",").filter(lineId => !!lineId);
    const whatsapps: string[] = property.whatsapp.split(",").filter(whatsapp => !!whatsapp).map(whatsapp => whatsapp.replaceAll("+", "").replaceAll(" ", ""));
    const facebookMessengers: string[] = property.facebookMessenger.split(",").filter(facebookMessenger => !!facebookMessenger);
    const wechats: string[] = property.wechat.split(",").filter(wechat => !!wechat).map(wechat => wechat.replaceAll("+", "").replaceAll(" ", ""));

    return (
        <div className={"flex flex-col"}>
            <div className={"flex flex-row gap-2"}>
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
                            <ContactCopyOrLink key={lineId} contact={lineId} onClickCopy={text => onClickCopy(text)}/>
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
                            <ContactCopyOrLink key={facebookMessenger} contact={facebookMessenger}
                                               onClickCopy={text => onClickCopy(text)}/>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PropertyContact;
