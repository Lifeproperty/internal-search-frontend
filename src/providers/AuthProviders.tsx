"use client";
import React, {useEffect, useState, useTransition} from "react";
import {auth} from "@/config/firebase";
import {useRouter} from "next/navigation";
import {Box, CircularProgress} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useAppDispatch} from "@/hooks/useAppDispatch";
import {setAuth} from "@/store";
import dayjs from "dayjs";
import {setAccessToken} from "@/utils/tokenUtils";

export const AuthProviders = ({children}: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [isPending, startTransition] = useTransition();
    const [timeOutRefreshToken, setTimeOutRefreshToken] = useState<number>();

    const getTriggerTime = (expirationTime: string) => {
        return dayjs(expirationTime).subtract(5, "minute").diff(dayjs());
    };

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (!user) {
                dispatch(setAuth(false));
                startTransition(() => {
                    router.replace("/login");
                });
            } else {
                const idTokenResult = await user.getIdTokenResult();
                setAccessToken(idTokenResult.token);
                setTimeOutRefreshToken(getTriggerTime(idTokenResult.expirationTime));
                dispatch(setAuth(true));
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (!timeOutRefreshToken) return;

        const refreshIdToken = setTimeout(() => {
            auth.currentUser?.getIdTokenResult(true).then((idTokenResult) => {
                setAccessToken(idTokenResult.token);
                setTimeOutRefreshToken(getTriggerTime(idTokenResult.expirationTime));
            });
        }, timeOutRefreshToken);

        return () => clearTimeout(refreshIdToken);
    }, [timeOutRefreshToken]);

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
