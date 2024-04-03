import {Button, Link} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Typography from "@mui/material/Typography";
import {Property} from "@/types/listing";
import {useMemo} from "react";
import {PostType} from "@/constants/property";

interface PropertyDetailsProps {
    property: Property;
    onClickCopy: (text: string) => void;
}

export const PropertyDescription = ({property, onClickCopy}: PropertyDetailsProps) => {
    const lpUrl = useMemo(() => {
        const postType = property.postType === PostType.Rent ? "R" : "S";
        return `https://www.lifepropertyasia.com/en/re/${postType}/${property.sku}`;
    }, [property]);

    const detail = () =>
        `[${property.postType}] ${property.titleEN} (${property.sku})
🚗 Near ${property.areaLP}
        
🏡 Property Type: ${property.propertyType}${property?.bedroom && property.bathroom ? `\n- Bed-Bath: ${property?.bedroom} Beds ${property.bathroom} Baths` : property?.bedroom ? `\n- Bed: ${property?.bedroom}` : property?.bathroom ? `\n- Bath: ${property?.bathroom}` : ""}${property.areaSize ? `\n- Unit Size: ${property.areaSize} sq.m.` : ""}${property.floor ? `\n- Floor: ${property.floor}` : ""}${property.facingDirection ? `\n- Facing Direction: ${property.facingDirection}` : ""}${`\n- Pet: ${property.petAllowed || "Not Allow"}`}
        
💸 ${property.postType === "Rent" ? `Rental Price: ${property.price.toLocaleString()} thb/month` : `Selling Price: ${property.price.toLocaleString()} thb`}\n\n${lpUrl}`;

    return (
        <div className={"flex flex-col items-start gap-2 max-w-[calc(100vw-48px)] md:max-w-full"}>
            <Button variant="contained" onClick={() => onClickCopy(detail())}
                    endIcon={<ContentCopyIcon/>}>
                Copy
            </Button>
            <Typography>
                <div>
                    {`[${property.postType}] ${property.titleEN} (${property.sku})`}
                </div>
                <div>
                    {`🚗 Near ${property.areaLP}`}
                </div>

                <div className={"mt-4"}>
                    {`🏡 Property Type: ${property.propertyType}`}
                </div>
                {(property?.bedroom || property.bathroom) && (
                    <div>
                        {property?.bedroom && property.bathroom ? `- Bed-Bath: ${property?.bedroom} Beds ${property.bathroom} Baths` : property?.bedroom ? `- Bed: ${property?.bedroom}` : property?.bathroom ? `- Bath: ${property?.bathroom}` : ""}
                    </div>
                )}
                {property.areaSize && (
                    <div>
                        {`- Unit Size: ${property.areaSize} sq.m.`}
                    </div>
                )}
                {property.floor && (
                    <div>
                        {`- Floor: ${property.floor}`}
                    </div>
                )}
                {property.facingDirection && (
                    <div>
                        {`- Facing Direction: ${property.facingDirection}`}
                    </div>
                )}
                <div>
                    {`- Pet: ${property.petAllowed || "Not Allow"}`}
                </div>
                <div className={"mt-4"}>
                    {property.postType === "Rent" ? `💸 Rental Price: ${property.price.toLocaleString()} thb/month` : `💸 Selling Price: ${property.price.toLocaleString()} thb`}
                </div>

                <div className={"mt-4"}>
                    <Link href={lpUrl}
                          target={"_blank"}>
                        {lpUrl}
                    </Link>
                </div>
            </Typography>
        </div>
    );
};
