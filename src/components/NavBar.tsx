"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import SearchIcon from "@mui/icons-material/Search";
import {auth} from "@/config/firebase";
import {useAppSelector} from "@/hooks/useAppSelector";
import {selectIsAuth} from "@/store";

export const NavBar = () => {
    const isAuth = useAppSelector(selectIsAuth);

    const clickSignOut = async () => {
        await auth.signOut();
    };

    return (
        <>
            {isAuth && <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar className={"justify-between"}>
                        <SearchIcon sx={{mr: 1}}/>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            className={"hidden md:block"}
                            sx={{flexGrow: 1}}
                        >
                            Internal Search
                        </Typography>
                        <Box component="div" className={"flex flex-row items-center"}>
                            <Typography component="div" className={"px-4"}>
                                {auth.currentUser?.email}
                            </Typography>
                            <Button color="inherit" onClick={clickSignOut}>Sign Out</Button>
                        </Box>
                    </Toolbar>
                </AppBar>
            </Box>}
        </>
    );
};
