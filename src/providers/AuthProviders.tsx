"use client";
import React, {useEffect, useState, useTransition} from "react";
import {auth} from "@/config/firebase";
import {useRouter} from "next/navigation";
import {Box, CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {setAuth} from "@/store";

export const AuthProviders = ({children}: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (!user) {
                startTransition(() => {
                    router.replace("/login");
                });
                console.log("No user is signed in");
                dispatch(setAuth(false));
            } else {
                const token = await user.getIdToken();
                localStorage.setItem("accessToken", token);
                dispatch(setAuth(true));
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    if (loading || isPending) {
        return (
            <Box sx={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                justifyContent: "center",
                alignItems: "center"
            }}>
                <CircularProgress size={64}/>
                <Typography>
                    Loading...
                </Typography>
            </Box>

        );
    }

    return (
        <>
            {children}
        </>
    );
};
