import Image from "next/image";
import ImageIcon from "@mui/icons-material/Image";
import useGetImagesFromSku from "@/hooks/useGetImagesFromSku";
import {Skeleton} from "@mui/material";


interface ListingImageProps {
    sku: string;
}

export const ListingImage = ({sku}: ListingImageProps) => {
    const {data, isLoading} = useGetImagesFromSku({sku, limit: 1});
    const image = data?.[0];

    if (isLoading) return <Skeleton variant="rectangular"/>;

    return (
        <>
            {image ? (
                <Image src={`https://drive.google.com/thumbnail?id=${image.id}`}
                       className={"object-cover"}
                       priority
                       fill
                       alt={"test"}/>
            ) : (
                <div className={"flex flex-row gap-1 items-center h-[100px]"}>
                    <ImageIcon/>
                    No Image
                </div>
            )}
        </>
    );
};
