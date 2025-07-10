import {Box} from "@mui/material";
import {AvailabilityType} from "@/types/availability";

interface AvailabilityDotProps {
    value: AvailabilityType;
}

export const AvailabilityDot = ({value}: AvailabilityDotProps) => {
    const colorConfigs = {
        [AvailabilityType.Available]: "bg-green-700",
        [AvailabilityType.Not_Available]: "bg-red-700",
        [AvailabilityType.Cannot_contact]: "bg-gray-400"
    };

    return (
        <Box className={`rounded-full ${colorConfigs[value]}  w-2 h-2 min-w-2`}/>
    );
};
