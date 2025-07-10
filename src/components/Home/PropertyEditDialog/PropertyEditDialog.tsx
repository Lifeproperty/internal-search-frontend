import {Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton} from "@mui/material";
import {Property} from "@/types/listing";
import useIsDesktopScreen from "@/hooks/useIsDesktopScreen";
import * as React from "react";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import CloseIcon from '@mui/icons-material/Close';
import {useForm} from "react-hook-form";
import {PropertyEditForm} from "./PropertyEditForm";
import {updateListing} from "@/services/listingsApi";
import {enqueueSnackbar} from "notistack";
import {updateOldCache} from "@/utils/propertyUtils";
import {useQueryClient} from "@tanstack/react-query";
import {LoadingButton} from "@mui/lab";

interface PropertyEditDialogProps {
    property: Property;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const PropertyEditDialog = ({property, open, setOpen}: PropertyEditDialogProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const queryClient = useQueryClient();
    const {control, handleSubmit, register, reset} = useForm<Property>();
    const isDesktopScreen = useIsDesktopScreen();

    useEffect(() => {
        reset(property);
    }, [property]);

    const handleClose = () => {
        setOpen(false);
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
            const response = await updateListing(data.postType, data.sku, payload);
            updateOldCache(queryClient, response);
            enqueueSnackbar("Update successfully", {variant: "success", autoHideDuration: 3000});
            setOpen(false);
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
        >
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    <PropertyEditForm property={property} control={control} register={register}/>
                </DialogContent>
                <DialogActions>
                    <Button disabled={isLoading} onClick={clickResetHandler} variant="outlined">Reset</Button>
                    <LoadingButton loading={isLoading} type={"submit"} variant="contained">
                        Update
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};
