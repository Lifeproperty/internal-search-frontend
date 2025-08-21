import {Property} from "@/types/listing";
import {Autocomplete, Checkbox, FormControlLabel, TextField, Grid} from "@mui/material";
import useIsDesktopScreen from "@/hooks/useIsDesktopScreen";
import {Control, Controller, UseFormRegister} from "react-hook-form";
import * as React from "react";
import {getVirtualizedAutocompleteConfig} from "@/utils/autocompleteVirtualizationUtils";
import {usePropertyOptions} from "@/hooks/usePropertyOptions";
import useGetAllListings from "@/hooks/useGetAllListings";
import Typography from "@mui/material/Typography";
import dayjs from "dayjs";

interface PropertyFormProps {
    register: UseFormRegister<Property>;
    control: Control<Property, Property>;
    property: Property;
}

export const PropertyEditForm = ({control, property, register}: PropertyFormProps) => {
    const isDesktopScreen = useIsDesktopScreen();
    const {data} = useGetAllListings();
    const size = isDesktopScreen ? "medium" : "small";
    const {
        projectNameOptions,
        propertyTypeOptions,
        postFromTypeOptions,
    } = usePropertyOptions(data || []);
    const updateAvailabilityText = property.updateAvailability ? dayjs(property.updateAvailability)?.format("DD/MM/YYYY HH:mm:ss") : "-";

    return (
        <Grid container spacing={2}>
            <Grid size={12}>
                <Controller
                    name="titleEN"
                    control={control}
                    render={({field: {onChange, ...field}}) => (
                        <Autocomplete
                            {...field}
                            {...getVirtualizedAutocompleteConfig()}
                            disableCloseOnSelect
                            size={size}
                            freeSolo
                            renderOption={(props, option, state) =>
                                [props, option, state.index] as React.ReactNode
                            }
                            options={projectNameOptions}
                            renderInput={(params) => (
                                <TextField{...params} label="Project Name" placeholder="Project Name"/>
                            )}
                            onChange={(e, data) => onChange(data)}
                            onKeyUp={(event) => onChange((event.target as any).value)}
                        />
                    )}
                />
            </Grid>
            <Grid size={6}>
                <Controller
                    name="postFrom"
                    control={control}
                    render={({field: {onChange, ...field}}) => (
                        <Autocomplete
                            {...field}
                            size={size}
                            options={postFromTypeOptions}
                            renderInput={(params) => (
                                <TextField {...params} label="Post From" placeholder="Post From"/>
                            )}
                            onChange={(e, data) => onChange(data)}
                        />
                    )}
                />
            </Grid>
            <Grid size={6}>
                <Controller
                    name="propertyType"
                    control={control}
                    render={({field: {onChange, ...field}}) => (
                        <Autocomplete
                            {...field}
                            size={size}
                            options={propertyTypeOptions}
                            renderInput={(params) => (
                                <TextField {...params} label="Property Type" placeholder="Property Type"/>
                            )}
                            onChange={(e, data) => onChange(data)}
                        />
                    )}
                />

            </Grid>
            <Grid size={6}>
                <TextField {...register("bedroom", {valueAsNumber: true})}
                           type={"number"}
                           label="Bedroom"
                           variant="outlined"
                           size={size}
                           fullWidth/>
            </Grid>
            <Grid size={6}>
                <TextField {...register("bathroom", {valueAsNumber: true})}
                           type={"number"}
                           label="Bathroom"
                           variant="outlined"
                           size={size}
                           fullWidth/>
            </Grid>
            <Grid container size={12}>
                <Grid size={6}>
                    <TextField {...register("unitNumber")}
                               label="Unit Number"
                               variant="outlined"
                               size={size}
                               fullWidth/>
                </Grid>
                <Grid size={6}>
                    <TextField {...register("floor")}
                               label="Floor"
                               variant="outlined"
                               size={size}
                               fullWidth/>
                </Grid>
                <Grid size={6}>
                    <TextField {...register("price", {valueAsNumber: true})}
                               type={"number"}
                               label="Price"
                               variant="outlined"
                               size={size}
                               fullWidth/>

                </Grid>
                <Grid size={6}>
                    <TextField {...register("areaSize", {valueAsNumber: true})}
                               label="Area Size"
                               variant="outlined"
                               size={size}
                               fullWidth/>

                </Grid>

                <Grid size={6} className={"flex item-center"}>
                    <Controller
                        name="petAllowed"
                        control={control}
                        render={({field: {onChange, value, ...field}}) => (
                            <FormControlLabel control={<Checkbox {...field} checked={!!value}
                                                                 onChange={event => onChange(event.target.checked)}/>}
                                              label="Pet Allowed"/>
                        )}
                    />
                </Grid>
                <Grid size={6} className={"flex item-center"}>
                    <Controller
                        name="exclusive"
                        control={control}
                        render={({field: {onChange, value, ...field}}) => (
                            <FormControlLabel control={<Checkbox {...field} checked={!!value}
                                                                 onChange={event => onChange(event.target.checked)}/>}
                                              label="Exclusive"/>
                        )}
                    />
                </Grid>
                <Grid size={12}>
                    <Typography>
                        Last Updated: {updateAvailabilityText}
                    </Typography>
                </Grid>
            </Grid>
        </Grid>
    );
};
