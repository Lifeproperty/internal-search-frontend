import * as React from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Autocomplete,
    Box, Checkbox,
    FormControlLabel,
    Stack,
    TextField
} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {SearchFormType} from "@/types/searchForm";
import {Property} from "@/types/listing";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/system/Unstable_Grid";
import {getVirtualizedAutocompleteConfig} from "@/utils/autocompleteVirtualizationUtils";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import {PostFormType, PostType, PropertyType, UpdateAvailabilityType} from "@/constants/property";
import SearchIcon from "@mui/icons-material/Search";
import useGetAllZoneListings from "@/hooks/useGetAllZoneListings";
import {AvailabilityType} from "@/types/availability";

interface SearchFormProps {
    properties: Property[];
    onSearch: (data: SearchFormType) => void;
}

export const SearchForm = ({properties, onSearch}: SearchFormProps) => {
    const {data: areaLVOptions} = useGetAllZoneListings();
    const {control, register, handleSubmit, setError, formState: {errors,}, trigger, reset} = useForm<SearchFormType>({
        defaultValues: {
            areaLPList: [],
            areaLVList: [],
            skuList: [],
            postTypeList: [],
            propertyTypeList: [],
            bathroomList: [],
            bedRoomList: [],
            projectNameList: [],
            postFormTypeList: [],
            availabilityList: [],
            updateAvailability: null,
            petAllowed: false,
            exclusive: false,
            minPrice: null,
            maxPrice: null,
            minAreaSize: null,
            maxAreaSize: null,
        }
    });
    const skuOptions: string[] = Array.from(new Set(properties?.map((property) => property.sku)) || []);
    const areaLPOptions: string[] = Array.from(new Set(properties?.map((property) => property.areaLP)) || []);
    const projectNameOptions: string[] = Array.from(new Set(properties?.map((property) => property.titleEN)) || []);
    const propertyTypeOptions: PropertyType[] = Object.values(PropertyType);
    const postTypeOptions: PostType[] = Object.values(PostType);
    const postFormTypeOptions: PostFormType[] = Object.values(PostFormType);
    const bedRoomOptions = ["Studio", ...new Array(3).fill(0).map((_, index) => (index + 1).toString())];
    const bathroomOptions = new Array(3).fill(0).map((_, index) => (index + 1).toString());
    const availabilityOptions = Object.values(AvailabilityType);
    const updateAvailabilityOptions = Object.values(UpdateAvailabilityType);

    const onSubmit = (data: SearchFormType) => {
        console.log(data);
        onSearch(data);
    };

    const resetHandler = () => {
        reset();
    };

    return (
        <Accordion defaultExpanded={true}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon/>}
                aria-controls="panel1-content"
                id="panel1-header"
            >
                <div className={"flex flex-row items-center gap-1"}>
                    <SearchIcon/>
                    <Typography variant="h6">
                        Search
                    </Typography>
                </div>
            </AccordionSummary>
            <AccordionDetails>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>
                    <Grid container spacing={2}>
                        <Grid xs={12}>
                            <Typography fontWeight={500}>
                                Property Information
                            </Typography>
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <Controller
                                name="areaLPList"
                                control={control}
                                render={({field: {onChange, ...field}}) => (
                                    <Autocomplete
                                        {...field}
                                        multiple
                                        options={areaLPOptions}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Area LP" placeholder="Area LP"/>
                                        )}
                                        onChange={(e, data) => onChange(data)}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <Controller
                                name="areaLVList"
                                control={control}
                                render={({field: {onChange, ...field}}) => (
                                    <Autocomplete
                                        {...field}
                                        multiple
                                        options={areaLVOptions || []}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Area LV" placeholder="Area LV"/>
                                        )}
                                        onChange={(e, data) => onChange(data)}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid xs={12} sm={12}>
                            <Controller
                                name="projectNameList"
                                control={control}
                                render={({field: {onChange, ...field}}) => (
                                    <Autocomplete
                                        {...field}
                                        {...getVirtualizedAutocompleteConfig()}
                                        multiple
                                        renderOption={(props, option, state) =>
                                            [props, option, state.index] as React.ReactNode
                                        }
                                        options={projectNameOptions}
                                        renderInput={(params) => (
                                            <TextField{...params} label="Project Name" placeholder="Project Name"/>
                                        )}
                                        onChange={(e, data) => onChange(data)}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid xs={12} sm={3}>
                            <Controller
                                name="postTypeList"
                                control={control}
                                render={({field: {onChange, ...field}}) => (
                                    <Autocomplete
                                        {...field}
                                        multiple
                                        options={postTypeOptions}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Post Type" placeholder="Post Type"/>
                                        )}
                                        onChange={(e, data) => onChange(data)}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid xs={12} sm={3}>
                            <Controller
                                name="bedRoomList"
                                control={control}
                                render={({field: {onChange, ...field}}) => (
                                    <Autocomplete
                                        {...field}
                                        multiple
                                        options={bedRoomOptions}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Bedroom" placeholder="Bedroom"/>
                                        )}
                                        getOptionLabel={(option) => isNaN(Number(option)) ? option : (+option) > 2 ? `${option} Bedroom more` : `${option} Bedroom`}
                                        onChange={(e, data) => onChange(data)}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid xs={12} sm={3}>
                            <Controller
                                name="bathroomList"
                                control={control}
                                render={({field: {onChange, ...field}}) => (
                                    <Autocomplete
                                        {...field}
                                        multiple
                                        options={bathroomOptions}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Bathroom" placeholder="Bathroom"/>
                                        )}
                                        getOptionLabel={(option) => `${option} Bathroom ${(+option) > 2 ? " more" : ""}`}
                                        onChange={(e, data) => onChange(data)}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid xs={12} sm={3}>
                            <Controller
                                name="postFormTypeList"
                                control={control}
                                render={({field: {onChange, ...field}}) => (
                                    <Autocomplete
                                        {...field}
                                        multiple
                                        options={postFormTypeOptions}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Post From" placeholder="Post From"/>
                                        )}
                                        onChange={(e, data) => onChange(data)}
                                    />
                                )}
                            />
                        </Grid>

                        <Grid container xs={12} sm={6}>
                            <Grid xs={12}>
                                <Typography fontWeight={500}>
                                    Price
                                </Typography>
                            </Grid>
                            <Grid xs={6}>
                                <TextField {...register("minPrice", {valueAsNumber: true})}
                                           type={"number"}
                                           label="Min price"
                                           variant="outlined"
                                           fullWidth/>
                            </Grid>
                            <Grid xs={6}>
                                <TextField {...register("maxPrice", {valueAsNumber: true})}
                                           type={"number"}
                                           label="Max price"
                                           variant="outlined"
                                           fullWidth/>
                            </Grid>
                        </Grid>

                        <Grid container xs={12} sm={6}>
                            <Grid xs={12}>
                                <Typography fontWeight={500}>
                                    Floor size (Sqm)
                                </Typography>
                            </Grid>
                            <Grid xs={6}>
                                <TextField {...register("minAreaSize", {valueAsNumber: true})}
                                           type={"number"}
                                           label="Min floor size"
                                           variant="outlined"
                                           fullWidth/>
                            </Grid>
                            <Grid xs={6}>
                                <TextField {...register("maxAreaSize", {valueAsNumber: true})}
                                           type={"number"}
                                           label="Max floor size"
                                           variant="outlined"
                                           fullWidth/>
                            </Grid>
                        </Grid>

                        <Grid xs={12} sm={6}>
                            <Controller
                                name="skuList"
                                control={control}
                                render={({field: {onChange, ...field}}) => (
                                    <Autocomplete
                                        {...field}
                                        {...getVirtualizedAutocompleteConfig()}
                                        multiple
                                        renderOption={(props, option, state) =>
                                            [props, option, state.index] as React.ReactNode
                                        }
                                        options={skuOptions}
                                        renderInput={(params) => (
                                            <TextField{...params} label="LP Code" placeholder="LP Code"/>
                                        )}
                                        onChange={(e, data) => onChange(data)}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid xs={12} sm={6}>
                            <Controller
                                name="propertyTypeList"
                                control={control}
                                render={({field: {onChange, ...field}}) => (
                                    <Autocomplete
                                        {...field}
                                        multiple
                                        options={propertyTypeOptions}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Property Type" placeholder="Property Type"/>
                                        )}
                                        onChange={(e, data) => onChange(data)}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid xs={12}>
                            <Typography fontWeight={500}>
                                Other Criteria
                            </Typography>
                        </Grid>
                        <Grid xs={12} sm={3}>
                            <Controller
                                name="availabilityList"
                                control={control}
                                render={({field: {onChange, ...field}}) => (
                                    <Autocomplete
                                        {...field}
                                        multiple
                                        options={availabilityOptions}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Availability" placeholder="Availability"/>
                                        )}
                                        onChange={(e, data) => onChange(data)}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid xs={12} sm={3}>
                            <Controller
                                name="updateAvailability"
                                control={control}
                                render={({field: {onChange, ...field}}) => (
                                    <Autocomplete
                                        {...field}
                                        options={updateAvailabilityOptions}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Update Availability"
                                                       placeholder="Update Availability"/>
                                        )}
                                        onChange={(e, data) => onChange(data)}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid xs={6} sm={3} md={2} className={"flex item-center"}>
                            <Controller
                                name="petAllowed"
                                control={control}
                                render={({field: {onChange, value, ...field}}) => (
                                    <FormControlLabel control={<Checkbox {...field} checked={value}
                                                                         onChange={event => onChange(event.target.checked)}/>}
                                                      label="Pet Allowed"/>
                                )}
                            />
                        </Grid>
                        <Grid xs={6} sm={3} md={2} className={"flex item-center"}>
                            <Controller
                                name="exclusive"
                                control={control}
                                render={({field: {onChange, value, ...field}}) => (
                                    <FormControlLabel control={<Checkbox {...field} checked={value}
                                                                         onChange={event => onChange(event.target.checked)}/>}
                                                      label="Exclusive"/>
                                )}
                            />
                        </Grid>

                        <Grid xs={12}>
                            <Stack spacing={2} direction="row" justifyContent={"end"}>
                                <Button variant="outlined" onClick={resetHandler}>Reset</Button>
                                <Button type={"submit"} variant="contained">Search</Button>
                            </Stack>
                        </Grid>
                    </Grid>
                </Box>
            </AccordionDetails>
        </Accordion>

    );
};

