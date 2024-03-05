import {Button} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Typography from "@mui/material/Typography";
import {Property} from "@/types/listing";

interface PropertyDetailsProps {
    property: Property;
    onClickCopy: (text: string) => void;

}
export const PropertyDetail = ({property, onClickCopy}: PropertyDetailsProps) => {
    const detail = () =>
        `[${property.postType}] ${property.titleEN} (${property.sku})
🚗 Near ${property.areaLP}
        
🏡 Property Type: ${property.propertyType}${property?.bedroom && property.bathroom ? `\n- Bed-Bath: ${property?.bedroom} Beds ${property.bathroom} Baths` : property?.bedroom ? `\n- Bed: ${property?.bedroom}` : property?.bathroom ? `\n- Bath: ${property?.bathroom}` : ""}${property.areaSize ? `\n- Unit Size: ${property.areaSize} sq.m.` : ""}${property.floor ? `\n- Floor: ${property.floor}` : ""}
        
💸 ${property.postType === "Rent" ? `Rental Price: ${property.price.toLocaleString()} thb/month` : `Selling Price: ${property.price.toLocaleString()} thb`}`;

    return (
        <div className={"flex flex-col items-start gap-2"}>
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
