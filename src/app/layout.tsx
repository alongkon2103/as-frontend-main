"use client";

import { ReduxProvider } from "@/store/provider";
import { Toaster } from "react-hot-toast";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./styles/global.scss";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "../../i18n";
import Cookies from "js-cookie";
import { persistor } from "@/store/store";
import { useEffect } from "react";
import ClarityScript from "../scripts/ClarityScript";

import dayjs from "dayjs";
import updateLocale from "dayjs/plugin/updateLocale";

dayjs.extend(updateLocale);
dayjs.updateLocale("en", {
  weekStart: 1,
  yearStart: 2,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const version = "0.0.5";
    if (
      localStorage.getItem("version") &&
      localStorage.getItem("version") !== version
    ) {
      Object.keys(Cookies.get()).forEach(function (cookieName) {
        Cookies.remove(cookieName);
      });
      persistor.purge();
      localStorage.clear();
    } else {
      localStorage.setItem("version", version);
    }
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Senior Aerospace</title>
        <meta name="description" content="Senior Aerospace Aerostructure" />
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
        <ClarityScript />
      </head>
      <body>
        <ReduxProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            {children}
          </LocalizationProvider>
          <Toaster />
        </ReduxProvider>
      </body>
    </html>
  );
}
