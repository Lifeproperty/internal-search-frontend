import React, { useState, useEffect } from 'react';
import { Autocomplete, TextField, Box } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { Property } from '@/types/listing';
import useGetAllListings from '@/hooks/useGetAllListings';

interface SkuInputProps {
    control: Control<Property, Property>;
    size?: 'small' | 'medium';
    required?: boolean;
}

export const SkuInput = ({ control, size = 'medium', required = false }: SkuInputProps) => {
    const { data: listings } = useGetAllListings();
    const [codeOptions, setCodeOptions] = useState<string[]>([]);
    const [selectedCode, setSelectedCode] = useState<string>('');
    const [nextNumber, setNextNumber] = useState<number>(1);

    // Extract unique codes from existing SKUs
    useEffect(() => {
        if (listings) {
            const codes = new Set<string>();
            listings.forEach(listing => {
                if (listing.sku) {
                    const match = listing.sku.match(/^([A-Z]+)-/);
                    if (match) {
                        codes.add(match[1]);
                    }
                }
            });
            setCodeOptions(Array.from(codes).sort());
        }
    }, [listings]);

    const handleCodeChange = (newCode: string | null, onChange: (value: string) => void) => {
        if (newCode) {
            // Clean the code to only allow uppercase letters
            const cleanCode = newCode.toUpperCase().replace(/[^A-Z]/g, '');
            setSelectedCode(cleanCode);

            // Calculate the next number for this specific code
            if (listings) {
                const existingNumbers = listings
                    .filter(listing => listing.sku?.startsWith(`${cleanCode}-`))
                    .map(listing => {
                        const match = listing.sku?.match(/^[A-Z]+-(\d+)$/);
                        return match ? parseInt(match[1], 10) : 0;
                    })
                    .filter(num => !isNaN(num));

                const maxNumber = existingNumbers.length > 0 ? Math.max(...existingNumbers) : 0;
                const nextNum = maxNumber + 1;
                setNextNumber(nextNum);

                // Auto-generate SKU with correct number
                const autoSku = `${cleanCode}-${nextNum}`;
                onChange(autoSku);
            }
        } else {
            setSelectedCode('');
            setNextNumber(1);
            onChange('');
        }
    };

    return (
        <Controller
            name="sku"
            control={control}
            render={({ field: { onChange, value, ...field } }) => (
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', width: '100%' }}>
                    <Box sx={{ display: 'flex', gap: 1, flex: 1 }}>
                        <Autocomplete
                            {...field}
                            freeSolo
                            size={size}
                            options={codeOptions}
                            value={selectedCode}
                            sx={{ flex: 1 }}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Code"
                                    placeholder="AR, BR, etc."
                                    inputProps={{
                                        ...params.inputProps,
                                        style: { textTransform: 'uppercase' }
                                    }}
                                />
                            )}
                            onChange={(e, newValue) => handleCodeChange(newValue, onChange)}
                            onInputChange={(e, newInputValue) => {
                                if (e?.type === 'change') {
                                    handleCodeChange(newInputValue, onChange);
                                }
                            }}
                        />
                        <TextField
                            size={size}
                            value={nextNumber}
                            label="Number"
                            type="number"
                            sx={{ flex: 1 }}
                            InputProps={{ readOnly: true }}
                        />
                    </Box>
                    <TextField
                        {...field}
                        size={size}
                        label="SKU"
                        value={value || ''}
                        variant="outlined"
                        required={required}
                        sx={{ flex: 1 }}
                        InputProps={{ readOnly: true }}
                        placeholder="Generated SKU"
                    />
                </Box>
            )}
        />
    );
};
