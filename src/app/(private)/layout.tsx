/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useState, useEffect, use } from "react";
import { useAppSelector } from "@/store/hooks";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Sidebar from "@/components/layout/SideBar";
import Header from "@/components/layout/Header";
import { useAppDispatch } from "@/store/hooks";
import Cookies from "js-cookie";
import { AuthActions } from "@/store/features/Auth/AuthSlice";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import { persistor } from "@/store/store";
import { formatSuffix } from "@/utils/utils";
import { UserRoles } from "@/utils/types";
import { getThemedStyles } from "./styles";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { isAuthenticated, currentUser } = useAppSelector(
    (state) => state.auth
  );
  const jobHeader = useAppSelector((state) => state.header.header.job);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const styles = getThemedStyles(isSidebarOpen);
  useEffect(() => {
    if (!Cookies.get("expires_in")) {
      persistor.purge();
      dispatch(AuthActions.handleLogout());
    }
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, []);

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

  const getDashboardName = () => {
    if (pathname.includes("job")) {
      return `${params.get("projectName")}`;
    } else {
      return "";
    }
  };

  const getLink = () => {
    if (pathname.includes("job")) {
      return `/projects?id=${params.get("project")}&name=${params.get(
        "projectName"
      )}&page=1`;
    }
  };

  const getBoldText = () => {
    if (pathname === "/") {
      switch (currentUser.role) {
        case UserRoles.ADMIN:
        case UserRoles.PLANNER:
          return t("planner_dashboard");
        case UserRoles.OPERATOR_MANAGER:
          return t("op_dashboard");
        case UserRoles.OPERATOR:
          return t("my_tasks");
      }
    } else if (
      pathname.includes("project") ||
      pathname.includes("salesDashboard")
    ) {
      return params.get("name");
    } else if (pathname.includes("job")) {
      return (
        jobHeader ??
        `${params.get("item")} (JOB ${params.get("job")}-${formatSuffix(
          params.get("suffix") || "0"
        )})`
      );
    } else if (pathname.includes("productionOverview")) {
      return params.get("name");
    } else if (pathname.includes("machinePerformance")) {
      return t("machine_performance");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isAuthenticated) {
    if (global.location) router.push("/login");
  } else {
    return (
      mounted && (
        <Box style={{ display: "flex" }}>
          <Header
            dashboardName={getDashboardName()}
            firstInitial={
              currentUser.firstName ? currentUser.firstName[0] : "P"
            }
            boldText={getBoldText() ?? undefined}
            isSidebarOpen={isSidebarOpen}
            id={currentUser.employeeId}
            breadCrumbLink={getLink()}
            toggleSidebar={toggleSidebar}
          />
          <Sidebar open={isSidebarOpen} toggleSidebar={toggleSidebar} />
          <Box style={styles.layoutBox}>
            <Box sx={styles.layoutHeight}>{children}</Box>
          </Box>
        </Box>
      )
    );
  }
}
