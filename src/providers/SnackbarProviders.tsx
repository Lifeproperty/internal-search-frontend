'use client';
import React from "react";
import {SnackbarProvider} from "notistack";

export const SnackbarProviders = ({children}: { children: React.ReactNode }) => {
    return (
        <SnackbarProvider>
            {children}
        </SnackbarProvider>
    );
};


