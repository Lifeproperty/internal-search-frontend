import {Button} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Typography from "@mui/material/Typography";
import {Property} from "@/types/listing";

interface PropertyDetailsProps {
    property: Property;
    onClickCopy: (text: string) => void;

}
export const PropertyDescription = ({property, onClickCopy}: PropertyDetailsProps) => {
    const detail = () =>
        `[${property.postType}] ${property.titleEN} (${property.sku})
🚗 Near ${property.areaLP}
        
🏡 Property Type: ${property.propertyType}${property?.bedroom && property.bathroom ? `\n- Bed-Bath: ${property?.bedroom} Beds ${property.bathroom} Baths` : property?.bedroom ? `\n- Bed: ${property?.bedroom}` : property?.bathroom ? `\n- Bath: ${property?.bathroom}` : ""}${property.areaSize ? `\n- Unit Size: ${property.areaSize} sq.m.` : ""}${property.floor ? `\n- Floor: ${property.floor}` : ""}${property.facingDirection ? `\n- Facing Direction: ${property.facingDirection}` : ""}${`\n- Pet: ${property.petAllowed || 'Not Allow'}`}
        
💸 ${property.postType === "Rent" ? `Rental Price: ${property.price.toLocaleString()} thb/month` : `Selling Price: ${property.price.toLocaleString()} thb`}`;

    return (
        <div className={"flex flex-col items-start gap-2 max-w-[calc(100vw-48px)] md:max-w-full"}>
            <Button variant="contained" onClick={() => onClickCopy(detail())}
                    endIcon={<ContentCopyIcon/>}>
                Copy
            </Button>
            <Typography className={"whitespace-pre-line"}>
                {detail()}
            </Typography>
        </div>
    );
};
