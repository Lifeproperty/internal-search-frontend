"use client";
import {Property} from "@/types/listing";
import {Box, Link} from "@mui/material";
import {DataGrid, GridColDef} from "@mui/x-data-grid";
import {ListingImage} from "@/components/Home/ListingImage";

interface ListingTableProps {
    rows: Property[];
}

export const ListingTable = ({rows}: ListingTableProps) => {


    const columns: GridColDef<Property>[] = [
        {
            field: "images",
            headerName: "Image",
            renderCell: (params) => (
                <ListingImage sku={params.row.sku}/>
            ),
            width: 160,
        },
        {
            field: "areaLP", headerName: "Area LP", width: 150,
            valueFormatter: (params) => params.value
        },
        {field: "areaLV", headerName: "Area LV", width: 150},
        {field: "sku", headerName: "SKU", width: 150},
        {field: "propertyType", headerName: "Property Type", width: 150},
        {field: "postType", headerName: "Post Type", width: 150},
        {field: "postFrom", headerName: "Post From", width: 150},
        {field: "titleTH", headerName: "Title TH", width: 150},
        {field: "titleEN", headerName: "Title EN", width: 150},
        {field: "price", headerName: "Price", width: 150},
        {field: "areaSize", headerName: "Area Size", width: 150},
        {field: "floor", headerName: "Floor", width: 150},
        {field: "bedroom", headerName: "Bedroom", width: 150},
        {field: "bathroom", headerName: "Bathroom", width: 150},
        {field: "petAllowed", headerName: "Pet Allowed", width: 150},
        {field: "facingDirection", headerName: "Facing Direction", width: 150},
        {field: "unitNumber", headerName: "Unit Number", width: 150},
        {field: "buildingYear", headerName: "Building Year", width: 150},
        {field: "lineId", headerName: "Line ID", width: 150},
        {
            field: "tel",
            headerName: "Tel.",
            width: 150,
            renderCell: (params) => {
                const tels: string[] = params.value.split(",");
                return <div className={'flex flex-col gap-1'}>
                    {tels.map((tel, index) => (
                        <Link href={`tel:${tel}`} key={index}>
                            {tel}
                        </Link>
                    ))}
                </div>;
            },
        },
        {field: "name", headerName: "Name", width: 150},
        {field: "whatsapp", headerName: "Whatsapp", width: 150},
        {field: "facebookMessenger", headerName: "Facebook Messenger", width: 150},
        {field: "wechat", headerName: "Wechat", width: 150},
        {field: "externalDataSource", headerName: "External Data Source", width: 150},
        {field: "feedbackChecked", headerName: "Feedback Checked", width: 150},
        {field: "listedOn", headerName: "Listed On", width: 150},
        {field: "availability", headerName: "Availability", width: 150},
        {field: "psCode", headerName: "PS Code", width: 150},
    ];

    return (
        <Box component={"div"} sx={{width: "100%"}}>
            <DataGrid
                rowHeight={80}
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[10, 25, 100]}
                disableRowSelectionOnClick
                getRowId={(row: Property) => row.sku + row.postType}
            />
        </Box>
    );
};
