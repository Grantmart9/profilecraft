"use client";
import { ThemeProvider } from "@mui/material";
import React from "react";
import theme from "./themeprovider";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-full w-full bg-gradient-to-br from-gray-50 to-white bg-fixed">
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
