import useGetImagesFromSku from "@/hooks/useGetImagesFromSku";
import {ImageList, ImageListItem, Skeleton} from "@mui/material";
import Image from "next/image";
import useIsDesktopScreen from "@/hooks/useIsDesktopScreen";

interface AllImagesListProps {
    sku: string;
}

export const AllImagesList = ({sku}: AllImagesListProps) => {
    const isDesktopScreen = useIsDesktopScreen();
    const {data: imageList, isLoading} = useGetImagesFromSku({sku});

    if (isLoading) return (
        <ImageList sx={{width: "100%", height: 500}} cols={isDesktopScreen ? 2 : 1} rowHeight={300}>
            {Array.from(Array(4).keys()).map((image) => (
                <ImageListItem key={image}>
                    <Skeleton variant="rectangular" height={300}/>
                </ImageListItem>
            ))}
        </ImageList>
    );

    return (
        <ImageList sx={{width: "100%", height: 500}} cols={isDesktopScreen ? 2 : 1} rowHeight={300}>
            {(imageList || [])?.map((image) => (
                <ImageListItem key={image.id}>
                    <Image src={`https://drive.google.com/uc?export=view&id=${image.id}`}
                           className={"object-cover"}
                           priority
                           sizes={isDesktopScreen ? '30vw' : '50vw'}
                           fill
                           alt={`image`}/>
                </ImageListItem>
            ))}
        </ImageList>
    );
};
