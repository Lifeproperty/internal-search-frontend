import {Autocomplete, Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import Grid from "@mui/system/Unstable_Grid";
import * as React from "react";
import {Property} from "@/types/listing";
import {Controller, useForm} from "react-hook-form";
import {updateListing} from "@/services/listingsApi";
import {useSnackbar} from "notistack";
import {useState} from "react";
import {LoadingButton} from "@mui/lab";
import {QueryObserverResult, RefetchOptions} from "@tanstack/query-core";
import {AvailabilityType} from "@/types/availability";
import dayjs from "dayjs";
import Typography from "@mui/material/Typography";

interface PropertyCommentProps {
    property: Property;
    refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<Property[], Error>>;
}

interface FormValues {
    comment: string;
    availability: AvailabilityType;
}

export const PropertyStatus = ({property, refetch}: PropertyCommentProps) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [comment, setComment] = useState<string>(property?.comment);
    const {enqueueSnackbar} = useSnackbar();
    const {control, register, handleSubmit, setError, formState: {errors,}, trigger, reset} = useForm<FormValues>({
        defaultValues: {
            comment: property.comment,
            availability: property.availability
        }
    });
    const availableOptions = Object.values(AvailabilityType);
    const updateAvailabilityText = property.updateAvailability ? dayjs(property.updateAvailability)?.format("DD/MM/YYYY HH:mm:ss") : "-";

    const resetHandler = () => {
        reset({
            comment: comment
        });
    };
    const onSubmit = async (data: FormValues) => {
        try {
            setIsLoading(true);
            const response = await updateListing(property.postType, property.sku, data);
            setComment(response.comment);
            enqueueSnackbar("Comment updated", {variant: "success"});
            refetch();
        } catch (e) {
            enqueueSnackbar("Error updating comment", {variant: "error"});
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Grid component="form" className={"max-w-[calc(100vw-60px)] md:max-w-[600px]"}
                  onSubmit={handleSubmit(onSubmit)}
                  container spacing={2}>
                <Grid xs={12}>
                    <Controller
                        name="availability"
                        control={control}
                        render={({field: {onChange, ...field}}) => (
                            <Autocomplete
                                {...field}
                                disablePortal
                                options={availableOptions}
                                renderInput={(params) => <TextField {...params} label="Availability"/>}
                                onChange={(e, data) => onChange(data)}
                            />
                        )}
                    />
                </Grid>
                <Grid xs={12}>
                    <Typography>
                        Update Availability: {updateAvailabilityText}
                    </Typography>
                </Grid>
                <Grid xs={12}>
                    <TextField {...register("comment",)}
                               rows={6}
                               multiline
                               label="Comments"
                               variant="outlined"
                               fullWidth/>
                </Grid>
                <Grid xs={12}>
                    <Stack spacing={2} direction="row" justifyContent={"end"}>
                        <Button disabled={isLoading} variant="outlined" onClick={resetHandler}>Reset</Button>
                        <LoadingButton loading={isLoading} type={"submit"} variant="contained">Save</LoadingButton>
                    </Stack>
                </Grid>
            </Grid>
        </>

    );
};
