import Image from "next/image";
import ImageIcon from "@mui/icons-material/Image";
import useGetImagesFromSku from "@/hooks/useGetImagesFromSku";


interface ListingImageProps {
    sku: string;
}

export const ListingImage = ({sku}: ListingImageProps) => {
    const {data} = useGetImagesFromSku({sku, limit: 1});
    const image = data?.[0];

    return (
        <>
            {image ? (
                <Image src={`https://drive.google.com/thumbnail?id=${image.id}`}
                       priority
                       width={160}
                       height={80} alt={"test"}/>
            ) : (
                <div className={"flex flex-row gap-1 items-center h-[100px]"}>
                    <ImageIcon/>
                    No Image
                </div>
            )}
        </>
    );
};
