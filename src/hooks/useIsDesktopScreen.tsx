import useMediaQuery from "@mui/material/useMediaQuery";
import theme from "@/theme";

const useIsDesktopScreen = () => {
    return useMediaQuery(theme.breakpoints.up("sm"))
};

export default useIsDesktopScreen;
