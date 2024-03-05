"use client";
import {Property} from "@/types/listing";
import {ListingImage} from "@/components/Home/ListingImage";
import {MaterialReactTable, MRT_ColumnDef, useMaterialReactTable} from "material-react-table";
import {useMemo} from "react";
import {ListingDetail} from "@/components/Home/ListingDetail";
import {AvailabilityDot} from "@/components/Home/AvailabilityDot";
import {useSnackbar} from "notistack";
import {QueryObserverResult, RefetchOptions} from "@tanstack/query-core";

interface ListingTableProps {
    rows: Property[];
    isLoading?: boolean;
    refetch: (options?: RefetchOptions | undefined) => Promise<QueryObserverResult<Property[], Error>>;
}

export const ListingTable = ({rows, isLoading, refetch}: ListingTableProps) => {
    const {enqueueSnackbar} = useSnackbar();

    const columns = useMemo<MRT_ColumnDef<Property>[]>(
        () => [
            {
                header: "Image",
                Cell: ({renderedCellValue, row}) => (
                    <ListingImage sku={row.original.sku}/>
                ),
                size: 120,
            },
            {
                accessorKey: "titleEN",
                header: "Title", size: 160,
                Cell: ({renderedCellValue, row}) => (
                    <div className={"flex flex-row items-center gap-2"}>
                        <AvailabilityDot value={row.original.availability}/>
                        <div>
                            {row.original.titleEN}
                        </div>
                    </div>
                ),
            },
            {accessorKey: "sku", header: "SKU", size: 50},
            {accessorKey: "areaLP", header: "Area LP", size: 100},
            {accessorKey: "areaLV", header: "Area LV", size: 200},
            {accessorKey: "propertyType", header: "Property Type", size: 150},
            {accessorKey: "postType", header: "Post Type", size: 150},
            {accessorKey: "postFrom", header: "Post From", size: 150},
            // {accessorKey: "titleTH", header: "Title TH", size: 150},
            {
                accessorKey: "price",
                header: "Price",
                size: 150,
                filterVariant: "range",
                Cell: ({cell}) => cell.getValue<number>().toLocaleString("en-US")
            },
            {
                accessorKey: "areaSize",
                header: "Area Size",
                size: 150,
                filterVariant: "range"
            },
            {accessorKey: "floor", header: "Floor", size: 150},
            {accessorKey: "bedroom", header: "Bedroom", size: 150},
            {accessorKey: "bathroom", header: "Bathroom", size: 150},
            {accessorKey: "petAllowed", header: "Pet Allowed", size: 150},
            {accessorKey: "facingDirection", header: "Facing Direction", size: 150},
            {accessorKey: "unitNumber", header: "Unit Number", size: 150},
            // {accessorKey: "buildingYear", header: "Building Year", size: 150},
            // {accessorKey: "lineId", header: "Line ID", size: 150},
            // {
            //     accessorKey: "tel",
            //     header: "Tel.",
            //     size: 150,
            //     Cell: ({renderedCellValue, row}) => {
            //         const tels: string[] = row.original.tel.split(",");
            //         return <div className={"flex flex-col gap-2"}>
            //             {tels.map((tel, index) => (
            //                 <Link href={`tel:${tel}`} key={index}>
            //                     {tel}
            //                 </Link>
            //             ))}
            //         </div>;
            //     },
            // },
            // {accessorKey: "name", header: "Name", size: 150},
            // {accessorKey: "whatsapp", header: "Whatsapp", size: 150},
            // {accessorKey: "facebookMessenger", header: "Facebook Messenger", size: 150},
            // {accessorKey: "wechat", header: "Wechat", size: 150},
            // {accessorKey: "externalDataSource", header: "External Data Source", size: 150},
            // {accessorKey: "feedbackChecked", header: "Feedback Checked", size: 150},
            // {accessorKey: "listedOn", header: "Listed On", size: 150},
            // {accessorKey: "availability", header: "Availability", size: 150},
            // {accessorKey: "psCode", header: "PS Code", size: 150},
        ], [],
    );

    const clickCopyHandler = async (text: string) => {
        enqueueSnackbar(text, {variant: "info"});
    };

    const table = useMaterialReactTable({
        enableStickyHeader: true,
        columns,
        enableColumnPinning: true,
        state: {
            isLoading: isLoading
        },
        muiTableContainerProps: {sx: {maxHeight: {xs: "60vh", sm: "100%"}},},
        renderDetailPanel: ({row}) => (
            <ListingDetail property={row.original} onClickCopy={clickCopyHandler} refetch={refetch}/>
        ),
        data: rows, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    });

    return (
        <MaterialReactTable table={table}/>
    );
};
