import {ListingImage} from "@/components/Home/ListingTable/ListingImage";
import {AvailabilityDot} from "@/components/Home/ListingTable/AvailabilityDot";
import Typography from "@mui/material/Typography";
import {Property} from "@/types/listing";
import { IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from "@mui/icons-material/Delete";

interface DetailsMobileProps {
    property: Property;
    onClickEdit: (value: Property) => void;
    onClickDelete: (value: Property) => void;
}

export const DetailsMobile = ({property, onClickEdit, onClickDelete}: DetailsMobileProps) => {

    const clickEditButtonHandler = () =>  {
        onClickEdit(property)
    }

    const clickDeleteButtonHandler = () =>  {
        onClickDelete(property)
    }

    return (
        <div className={"flex flex-col gap-2"}>
            <div className={"flex flex-row items-start gap-2"}>
                <div className={"relative h-[120px] w-[160px] min-w-[160px] overflow-hidden "}>
                    <ListingImage sku={property.sku}/>
                </div>
                <div className={"flex flex-col w-full"}>
                    <div className={'flex flex-row justify-between'}>
                        <div className={"flex flex-row gap-1 items-center"}>
                            {property.availability && <AvailabilityDot value={property.availability}/>}
                            <Typography>
                                {property.sku}
                            </Typography>
                        </div>
                        <div className={"pr-2"}>
                            <IconButton aria-label="edit" onClick={clickEditButtonHandler}>
                                <EditIcon/>
                            </IconButton>
                            <IconButton aria-label="edit" onClick={clickDeleteButtonHandler}>
                                <DeleteIcon/>
                            </IconButton>
                        </div>
                    </div>
                    <div className={"flex flex-row gap-1"}>
                        <Typography>
                            {property.titleEN}
                        </Typography>
                    </div>

                </div>
            </div>
            <div>
                <div className={"flex flex-row gap-6"}>
                    <div>
                        <Typography fontWeight={500}>
                            BE
                        </Typography>
                        <Typography>
                            {property?.bedroom || "-"}
                        </Typography>
                    </div>

                    <div>
                        <Typography fontWeight={500}>
                            BA
                        </Typography>
                        <Typography>
                            {property?.bathroom || "-"}
                        </Typography>
                    </div>

                    <div>
                        <Typography fontWeight={500}>
                            SQM
                        </Typography>
                        <Typography>
                            {property?.areaSize || "-"}
                        </Typography>
                    </div>

                    <div>
                        <Typography fontWeight={500}>
                            FL
                        </Typography>
                        <Typography>
                            {property?.floor || "-"}
                        </Typography>
                    </div>

                    <div>
                        <Typography fontWeight={500}>
                            UNIT
                        </Typography>
                        <Typography>
                            {property?.unitNumber || "-"}
                        </Typography>
                    </div>
                </div>
                <div className={"flex flex-row gap-1"}>
                    <Typography>
                        <span className={"font-medium"}>PRICE:</span> {property?.price?.toLocaleString("en-US") + " "}
                        <span className={"font-medium"}>({property.postType}, {property.postFrom}) </span>
                    </Typography>
                </div>
            </div>
        </div>
    );
};
