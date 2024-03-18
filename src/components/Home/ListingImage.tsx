import Image from "next/image";
import ImageIcon from "@mui/icons-material/Image";
import useGetImagesFromSku from "@/hooks/useGetImagesFromSku";
import {Dialog, DialogTitle, Skeleton} from "@mui/material";
import {useState} from "react";
import {AllImagesList} from "@/components/Home/AllImagesList";
import useIsDesktopScreen from "@/hooks/useIsDesktopScreen";


interface ListingImageProps {
    sku: string;
}

export const ListingImage = ({sku}: ListingImageProps) => {
    const isDesktopScreen = useIsDesktopScreen();
    const {data, isLoading} = useGetImagesFromSku({sku, limit: 1});
    const image = data?.[0];
    const [open, setOpen] = useState(false);

    if (isLoading) {
        return (
            <Skeleton variant={isDesktopScreen ? "rounded" : "rectangular"}
                      height={isDesktopScreen ? 12 : "100%"}
                      width={isDesktopScreen ? "90%" : "100%"}/>
        );
    }
    return (
        <>
            {image ? (
                <Image src={`https://drive.google.com/thumbnail?id=${image.id}`}
                       className={"object-cover hover:cursor-pointer"}
                       priority
                       fill
                       sizes={"30vw"}
                       onClick={() => setOpen(true)}
                       alt={"image"}/>
            ) : (
                <div className={"flex flex-row gap-1 items-center h-[100px]"}>
                    <ImageIcon/>
                    No Image
                </div>
            )}

            <Dialog onClose={() => setOpen(false)} open={open} maxWidth={"md"} fullWidth>
                <DialogTitle>Images</DialogTitle>
                <AllImagesList sku={sku}/>
            </Dialog>
        </>
    );
};
