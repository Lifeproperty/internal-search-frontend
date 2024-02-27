import * as React from "react";
import {Accordion, AccordionDetails, AccordionSummary, Autocomplete, Box, Stack, TextField} from "@mui/material";
import {Controller, useForm} from "react-hook-form";
import {SearchFormType} from "@/types/searchForm";
import {Property} from "@/types/listing";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Grid from "@mui/system/Unstable_Grid";
import {getVirtualizedAutocompleteConfig} from "@/utils/autocompleteVirtualizationUtils";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

interface SearchFormProps {
    properties: Property[];
    onSearch: (data: SearchFormType) => void;
}

export const SearchForm = ({properties, onSearch}: SearchFormProps) => {
    const {control, register, handleSubmit, setError, formState: {errors,}, trigger, reset} = useForm<SearchFormType>({
        defaultValues: {
            areaLPList: [],
            skuList: []
        }
    });
    const skuList: string[] = Array.from(new Set(properties?.map((property) => property.sku)) || []);
    const areaLPList: string[] = Array.from(new Set(properties?.map((property) => property.areaLP)) || []);


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
                <Typography variant="h6">
                    Search
                </Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{mt: 1}}>
                    <Grid container spacing={2}>
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
                                        options={skuList}
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
                                name="areaLPList"
                                control={control}
                                render={({field: {onChange, ...field}}) => (
                                    <Autocomplete
                                        {...field}
                                        multiple
                                        options={areaLPList}
                                        renderInput={(params) => (
                                            <TextField {...params} label="Area LP" placeholder="Area LP"/>
                                        )}
                                        onChange={(e, data) => onChange(data)}
                                    />
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

