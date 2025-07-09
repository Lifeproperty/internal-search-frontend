"use client";
import {Property} from "@/types/listing";
import {ListingImage} from "@/components/Home/ListingImage";
import {MaterialReactTable, MRT_ColumnDef, MRT_ExpandedState, useMaterialReactTable} from "material-react-table";
import {useMemo, useState} from "react";
import {ListingDetail} from "@/components/Home/ListingDetail";
import {AvailabilityDot} from "@/components/Home/AvailabilityDot";
import {useSnackbar} from "notistack";
import {DetailsMobile} from "@/components/Home/DetailsMobile";
import useIsDesktopScreen from "@/hooks/useIsDesktopScreen";
import {PropertyFormDialog} from "@/components/Home/PropertyFormDialog";
import {PropertyAddDialog} from "@/components/Home/PropertyAddDialog";
import {ListItemIcon, MenuItem, Button} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import {DeleteDialog} from "@/components/Home/DeleteDialog";

interface ListingTableProps {
    rows: Property[];
    isLoading?: boolean;
}

export const ListingTable = ({rows, isLoading}: ListingTableProps) => {
    const isDesktopScreen = useIsDesktopScreen();
    const {enqueueSnackbar} = useSnackbar();
    const [expanded, setExpanded] = useState<MRT_ExpandedState>({});
    const [selectedProperty, setSelectedProperty] = useState<Property>();
    const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
    const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);


    const openEditDialogHandler = (value: Property) => {
        setSelectedProperty({...value});
        setOpenEditDialog(true);
    };

    const openDeleteDialogHandler = (value: Property) => {
        setSelectedProperty({...value});
        setOpenDeleteDialog(true);
    }

    const columns = useMemo<MRT_ColumnDef<Property>[]>(
        () => isDesktopScreen ? [
            {
                header: "Image",
                Cell: ({row}) => (
                    <ListingImage sku={row.original.sku}/>
                ),
                size: 120,
            },
            {
                accessorKey: "titleEN",
                header: "Title", size: 160,
                Cell: ({row}) => (
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
            {accessorKey: "areaLV", header: "Area LV", size: 150},
            {accessorKey: "propertyType", header: "Property Type", size: 100},
            {accessorKey: "postType", header: "Post Type", size: 100},
            {accessorKey: "postFrom", header: "Post From", size: 100},
            {
                accessorKey: "price",
                header: "Price",
                size: 150,
                filterVariant: "range",
                Cell: ({cell}) => cell.getValue<number>()?.toLocaleString("en-US")
            },
            {accessorKey: "areaSize", header: "Area Size", size: 100, filterVariant: "range"},
            {accessorKey: "floor", header: "Floor", size: 150},
            {accessorKey: "bedroom", header: "Bedroom", size: 150},
            {accessorKey: "bathroom", header: "Bathroom", size: 150},
            {accessorKey: "petAllowed", header: "Pet Allowed", size: 150},
            {accessorKey: "facingDirection", header: "Facing Direction", size: 150},
            {accessorKey: "unitNumber", header: "Unit Number", size: 150},
            {accessorKey: "buildingYear", header: "Building Year", size: 150},
            {accessorKey: "lineId", header: "Line ID", size: 150},
            {accessorKey: "tel", header: "Tel.", size: 150,},
            {accessorKey: "name", header: "Name", size: 150},
            {accessorKey: "email", header: "Email", size: 150},
            {accessorKey: "whatsapp", header: "Whatsapp", size: 150},
            {accessorKey: "facebookMessenger", header: "Facebook Messenger", size: 150},
            {accessorKey: "wechat", header: "Wechat", size: 150},
            {accessorKey: "externalDataSource", header: "External Data Source", size: 150},
            {accessorKey: "feedbackChecked", header: "Feedback Checked", size: 150},
            {accessorKey: "listedOn", header: "Listed On", size: 150},
            {accessorKey: "availability", header: "Status", size: 150},
            {accessorKey: "psCode", header: "PS Code", size: 150},
        ] : [
            {
                header: "Details",
                enableColumnActions: false,
                minSize: 310,
                Cell: ({row}) => (
                    <DetailsMobile property={row.original} onClickEdit={openEditDialogHandler} onClickDelete={openDeleteDialogHandler}/>
                ),
            }
        ], [isDesktopScreen],
    );

    const clickCopyHandler = async (text: string) => {
        enqueueSnackbar(text, {variant: "info", autoHideDuration: 3000});
    };

    const table = useMaterialReactTable({
        enableStickyHeader: isDesktopScreen,
        columns,
        enableColumnPinning: isDesktopScreen,
        enableDensityToggle: isDesktopScreen,
        enableHiding: isDesktopScreen,
        enableFilters: isDesktopScreen,
        enableRowActions: isDesktopScreen,
        enableGlobalFilter: isDesktopScreen,
        renderTopToolbarCustomActions: () => (
            <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setOpenAddDialog(true)}
                disabled={isLoading}
            >
                Add Listing
            </Button>
        ),
        state: {
            isLoading,
            expanded
        },
        initialState: {
            pagination: {
                pageSize: 20,
                pageIndex: 0
            },
            columnPinning: {
                right: ["mrt-row-actions"],
            },
        },
        onExpandedChange: setExpanded,
        autoResetPageIndex: false, //don't reset the page index when data changes
        // muiTableContainerProps: {sx: {maxHeight: {xs: "60vh", sm: "100%"}},},
        muiTableBodyCellProps: {sx: {paddingLeft: 1, paddingRight: 0, paddingTop: 1, paddingBottom: 1}},
        muiTableHeadCellProps: {sx: {paddingLeft: 1, paddingRight: 0, width: 0}},
        renderDetailPanel: ({row}) => {
            return (
                <ListingDetail property={row.original} onClickCopy={clickCopyHandler}/>
            );
        },
        renderRowActionMenuItems: ({closeMenu, row}) => [
            <MenuItem key={0}
                      onClick={() => {
                          openEditDialogHandler(row.original);
                          closeMenu();
                      }}
                      sx={{m: 0}}
            >
                <ListItemIcon>
                    <EditIcon/>
                </ListItemIcon>
                Edit
            </MenuItem>,
            <MenuItem key={0}
                      onClick={() => {
                          openDeleteDialogHandler(row.original);
                          closeMenu();
                      }}
                      sx={{m: 0}}
            >
                <ListItemIcon>
                    <DeleteIcon/>
                </ListItemIcon>
                Delete
            </MenuItem>,
        ],
        data: rows, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    });

    return (
        <>
            <MaterialReactTable table={table}/>
            <PropertyAddDialog open={openAddDialog} setOpen={setOpenAddDialog}/>
            {selectedProperty && <>
                <PropertyFormDialog property={selectedProperty} open={openEditDialog} setOpen={setOpenEditDialog}/>
                <DeleteDialog property={selectedProperty} open={openDeleteDialog} setOpen={setOpenDeleteDialog}/>
            </>
            }
        </>
    );
};
