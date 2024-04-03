import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import {Property} from "@/types/listing";
import useIsDesktopScreen from "@/hooks/useIsDesktopScreen";
import * as React from "react";
import {Dispatch, SetStateAction, useState} from "react";
import {CloseIcon} from "next/dist/client/components/react-dev-overlay/internal/icons/CloseIcon";
import {useForm} from "react-hook-form";
import {PropertyForm} from "./PropertyForm";
import {updateListing} from "@/services/listingsApi";
import {enqueueSnackbar} from "notistack";
import {updateOldCache} from "@/utils/propertyUtils";
import {useQueryClient} from "@tanstack/react-query";
import {LoadingButton} from "@mui/lab";

interface PropertyFormDialog {
    property: Property;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const PropertyFormDialog = ({property, open, setOpen}: PropertyFormDialog) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const queryClient = useQueryClient();
    const {control, setValue, handleSubmit, register} = useForm<Property>({
        values: property
    });
    const isDesktopScreen = useIsDesktopScreen();

    const handleClose = () => {
        setOpen(false);
    };

    const onSubmit = async (data: Property) => {
        try {
            setIsLoading(true);
            const response = await updateListing(data.postType, data.sku, data);
            updateOldCache(queryClient, response);
            enqueueSnackbar("Update successfully", {variant: "success", autoHideDuration: 3000});
            setOpen(false)
        } catch (e) {
            enqueueSnackbar("Error updating data", {variant: "error"});
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
            PaperProps={{
                component: "form",
                onSubmit: handleSubmit(onSubmit),
            }}
        >
            <div className={"flex flex-row justify-between items-center"}>
                <DialogTitle id="responsive-dialog-title">
                    Edit Property - {property?.sku}/{property?.postType}
                </DialogTitle>
                <div className={"pr-2"}>
                    <IconButton aria-label="close" onClick={handleClose}>
                        <CloseIcon/>
                    </IconButton>
                </div>
            </div>

            <DialogContent dividers>
                <PropertyForm property={property} control={control} register={register}/>
            </DialogContent>
            <DialogActions>
                <Button disabled={isLoading} variant="outlined">Reset</Button>
                <LoadingButton loading={isLoading} type={"submit"} variant="contained">
                    Update
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
};
