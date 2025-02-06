"use client";

import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Select,
  Link,
  Breadcrumbs,
  Box,
} from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { getThemedStyles } from "./styles";
import { useDispatch } from "react-redux";
import { AuthActions } from "@/store/features/Auth/AuthSlice";
import { useTranslation } from "react-i18next";
import { persistor } from "@/store/store";
import Notifications from "./notifications";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
interface HeaderProps {
  dashboardName?: string;
  firstInitial: string;
  id: string;
  boldText?: string;
  isSidebarOpen: boolean;
  breadCrumbLink?: string;
  toggleSidebar: () => void;
}

const Header: React.FC<HeaderProps> = ({
  dashboardName,
  firstInitial,
  id,
  boldText,
  // isSidebarOpen,
  breadCrumbLink,
  toggleSidebar,
}) => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [language, setLanguage] = useState("en");
  const { i18n, t } = useTranslation();

  useEffect(() => {
    const lan = localStorage.getItem(`${id}_lan`);
    if (lan) {
      setLanguage(lan);
      i18n.changeLanguage(lan);
    }
  }, [i18n, id, setLanguage]);

  const styles = getThemedStyles();
  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAvatarClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    persistor.purge();
    dispatch(AuthActions.handleLogout());
  };

  const handleLanguageChange = (e: any) => {
    localStorage.setItem(`${id}_lan`, e.target.value);
    setLanguage(e.target.value);
    i18n.changeLanguage(e.target.value);
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        ...styles.headerWrapper,
        width: "100%",
        zIndex: 1300,
        boxShadow: "none",
        border: "1px solid rgba(0, 0, 0, 0.12);",
        "&:focus": {
          boxShadow: "none",
          border: "1px solid rgba(0, 0, 0, 0.12);",
        },
      }}
    >
      <Toolbar variant="dense">
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={toggleSidebar}
        >
          <MenuIcon
            sx={{
              color: "rgba(34, 95, 166, 1)",
            }}
          />
        </IconButton>
        <Image
          src="/senior-thailand-logo.svg"
          alt="logo"
          width={100}
          height={50}
        />
        <Typography
          sx={{
            flexGrow: 1,
            color: "rgba(34, 95, 166, 1)",
            marginLeft: "30px",
          }}
        >
          {breadCrumbLink ? (
            <>
              <Link href={breadCrumbLink}>{dashboardName}</Link>
              {" > "}
              {boldText ? <b>{boldText}</b> : null}
            </>
          ) : (
            <Breadcrumbs aria-label="breadcrumb"></Breadcrumbs>
          )}
          {!breadCrumbLink && (
            <>
              {dashboardName && dashboardName}
              {boldText ? <b>{boldText}</b> : null}
            </>
          )}
        </Typography>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={language}
          label="Age"
          size="small"
          onChange={handleLanguageChange}
        >
          <MenuItem value={"en"}>
            <Typography>EN</Typography>
          </MenuItem>
          <MenuItem value={"th"}>
            <Typography>TH</Typography>
          </MenuItem>
        </Select>
        <Box sx={{ marginLeft: "5px", marginRight: "5px" }}>
          <Notifications />
        </Box>
        <Avatar sx={{ marginLeft: "10px" }} onClick={handleAvatarClick}>
          <Avatar>{firstInitial}</Avatar>
        </Avatar>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleAvatarClose}
          elevation={0}
        >
          <MenuItem
            onClick={handleLogout}
            sx={{
              backgroundColor: "transparent",
              border: "1px solid rgba(0, 0, 0, 0.12);",
            }}
          >
            <ExitToApp color="primary" sx={{ marginRight: 1 }} />
            {t("logout")}
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
