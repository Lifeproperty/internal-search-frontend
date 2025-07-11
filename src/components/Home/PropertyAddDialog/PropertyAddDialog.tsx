import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import {Property} from "@/types/listing";
import useIsDesktopScreen from "@/hooks/useIsDesktopScreen";
import * as React from "react";
import {Dispatch, SetStateAction, useState} from "react";
import CloseIcon from '@mui/icons-material/Close';
import {useForm} from "react-hook-form";
import {PropertyAddForm} from "./PropertyAddForm";
import {createListing} from "@/services/listingsApi";
import {enqueueSnackbar} from "notistack";
import {useQueryClient} from "@tanstack/react-query";
import {LoadingButton} from "@mui/lab";
import {AvailabilityType} from "@/types/availability";
import {PostFromType, PostType, PropertyType} from "@/constants/property";

interface PropertyAddDialogProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

const defaultProperty: Property = {
    areaLP: "",
    areaLV: "",
    sku: "",
    propertyType: PropertyType.Condo,
    postType: PostType.Rent,
    postFrom: PostFromType.Owner,
    titleEN: "",
    price: 0,
    areaSize: 0,
    floor: "",
    bedroom: "",
    bathroom: "",
    petAllowed: "",
    exclusive: "",
    facingDirection: "",
    unitNumber: "",
    buildingYear: 0,
    email: "",
    lineId: "",
    tel: "",
    name: "",
    whatsapp: "",
    facebookMessenger: "",
    wechat: "",
    externalDataSource: "",
    listedOn: new Date().toISOString(),
    availability: AvailabilityType.Available,
    comment: "",
};

export const PropertyAddDialog = ({open, setOpen}: PropertyAddDialogProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const queryClient = useQueryClient();
    const {control, handleSubmit, register, reset} = useForm<Property>({
        defaultValues: defaultProperty
    });
    const isDesktopScreen = useIsDesktopScreen();

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    const clickResetHandler = () => {
        reset();
    };

    const onSubmit = async (data: Property) => {
        try {
            setIsLoading(true);
            const payload: Property = {
                ...data,
                exclusive: data.exclusive ? "Exclusive" : "",
                petAllowed: data.petAllowed ? "Allow" : ""
            };
            await createListing(payload);
            // Invalidate and refetch listings data
            queryClient.invalidateQueries({queryKey: ['listings']});
            enqueueSnackbar("Listing created successfully", {variant: "success", autoHideDuration: 3000});
            setOpen(false);
            reset();
        } catch (e) {
            enqueueSnackbar("Error creating listing", {variant: "error"});
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog
            fullScreen={!isDesktopScreen}
            scroll={"paper"}
            open={open}
            onClose={handleClose}
            aria-labelledby="responsive-dialog-title"
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={"flex flex-row justify-between items-center"}>
                    <DialogTitle id="responsive-dialog-title">
                        Add New Listing
                    </DialogTitle>
                    <div className={"pr-2"}>
                        <IconButton aria-label="close" onClick={handleClose}>
                            <CloseIcon/>
                        </IconButton>
                    </div>
                </div>

                <DialogContent dividers>
                    <PropertyAddForm property={defaultProperty} control={control} register={register}/>
                </DialogContent>
                <DialogActions>
                    <Button disabled={isLoading} onClick={clickResetHandler} variant="outlined">Reset</Button>
                    <LoadingButton loading={isLoading} type={"submit"} variant="contained">
                        Create
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};
