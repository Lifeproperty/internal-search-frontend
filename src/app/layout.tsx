import "./globals.css";

import type {Metadata} from "next";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v14-appRouter";
import React from "react";
import {ThemeProvider} from "@mui/material/styles";
import theme from "@/theme";
import {AuthProviders} from "@/providers/AuthProviders";
import {NavBar} from "@/components/NavBar";
import {ReduxProvider} from "@/providers/ReduxProvider";
import {QueryProvider} from "@/providers/QueryProvider";
import {SnackbarProviders} from "@/providers/SnackbarProviders";

export const metadata: Metadata = {
    title: "Internal Search",
    description: "Internal Search for listings",
};

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {

    return (
        <html lang="en">
        <body>
        <SnackbarProviders>
            <QueryProvider>
                <ReduxProvider>
                    <AuthProviders>
                        <AppRouterCacheProvider>
                            <ThemeProvider theme={theme}>
                                <div className={"bg-gray-50 h-screen"}>
                                    <NavBar/>
                                    {children}
                                </div>
                            </ThemeProvider>
                        </AppRouterCacheProvider>
                    </AuthProviders>
                </ReduxProvider>
            </QueryProvider>
        </SnackbarProviders>
        </body>
        </html>
    );
}
