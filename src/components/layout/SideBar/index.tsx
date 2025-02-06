"use client";

import { styled } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import WorkIcon from "@mui/icons-material/Work";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import SettingsApplicationsRoundedIcon from "@mui/icons-material/SettingsApplicationsRounded";
import Image from "next/image";
import { getThemedStyles } from "./styles";
import { Box, ListSubheader, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProjects } from "@/store/features/Project/ProjectSlice";
import {
  Project,
  generateSidebarUrl,
  groupBy,
  hasUserRole,
} from "@/utils/utils";
import { UserRoles } from "@/utils/types";
import { usePathname, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import { SidebarDropDownTypes } from "@/utils/types";
import { activeRoute } from "./utils";
import { TrendingUpRounded } from "@mui/icons-material";

const drawerWidth = 240;
const closedDrawerWidth = 48;

const StyledDrawer = styled(Drawer)(() => ({
  width: drawerWidth,
  display: "flex",
  "& .MuiDrawer-paper": {
    width: drawerWidth,
    boxSizing: "border-box",
    overflow: "visible",
  },
}));

const ClosedDrawer = styled(Drawer)(() => ({
  width: drawerWidth,
  display: "flex",
  "& .MuiDrawer-paper": {
    width: closedDrawerWidth,
    boxSizing: "border-box",
    overflow: "visible",
  },
}));

interface SidebarProps {
  open: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ open, toggleSidebar }: SidebarProps) {
  const dispatch = useAppDispatch();
  const styles = getThemedStyles();
  const { t } = useTranslation();
  const [openProjects, setOpenProjects] = useState(
    localStorage.getItem("open_project") === "true" ? true : false
  );
  const [openProductionOverviewProjects, setOpenProductionOverviewProjects] =
    useState(
      localStorage.getItem("open_production_overview_project") === "true"
        ? true
        : false
    );
  const [openSalesProjects, setOpenSalesProjects] = useState(
    localStorage.getItem("open_sales_project") === "true" ? true : false
  );
  const [openPerformanceSkys, setOpenPerformanceSkys] = useState(
    localStorage.getItem("open_performance_skys") === "true" ? true : false
  );
  const [openShopFloor, setOpenShopFloor] = useState(
    localStorage.getItem("open_shopfloor") === "true" ? true : false
  );

  const { role } = useAppSelector((state) => state.auth.currentUser);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (role !== UserRoles.OPERATOR) {
      dispatch(fetchProjects({ businessSegment: "" }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role]);

  const onFetchProjects = async (projectType: SidebarDropDownTypes) => {
    switch (projectType) {
      case SidebarDropDownTypes.PROJECTS:
        if (!openProjects) {
          setOpenProductionOverviewProjects(false);
          setOpenSalesProjects(false);
          setOpenProjects(true);
          setOpenPerformanceSkys(false);
          setOpenShopFloor(false);
          localStorage.setItem("open_project", "true");
          localStorage.setItem("open_production_overview_project", "false");
          localStorage.setItem("open_sales_project", "false");
          localStorage.setItem("open_performance_skys", "false");
          localStorage.setItem("open_shopfloor", "false");
        } else {
          setOpenProjects(false);
          localStorage.setItem("open_project", "false");
        }
        break;

      case SidebarDropDownTypes.PRODUCTION_OVERVIEW:
        if (!openProductionOverviewProjects) {
          setOpenProjects(false);
          setOpenSalesProjects(false);
          setOpenProductionOverviewProjects(true);
          setOpenPerformanceSkys(false);
          setOpenShopFloor(false);
          localStorage.setItem("open_production_overview_project", "true");
          localStorage.setItem("open_sales_project", "false");
          localStorage.setItem("open_project", "false");
          localStorage.setItem("open_performance_skys", "false");
          localStorage.setItem("open_shopfloor", "false");
        } else {
          setOpenProductionOverviewProjects(false);
          localStorage.setItem("open_production_overview_project", "false");
        }
        break;

      case SidebarDropDownTypes.SALES_DASHBOARD:
        if (!openSalesProjects) {
          setOpenProjects(false);
          setOpenProductionOverviewProjects(false);
          setOpenSalesProjects(true);
          setOpenPerformanceSkys(false);
          setOpenShopFloor(false);
          localStorage.setItem("open_project", "false");
          localStorage.setItem("open_production_overview_project", "false");
          localStorage.setItem("open_sales_project", "true");
          localStorage.setItem("open_performance_skys", "false");
          localStorage.setItem("open_shopfloor", "false");
        } else {
          setOpenSalesProjects(false);
          localStorage.setItem("open_sales_project", "false");
        }
        break;

      case SidebarDropDownTypes.PERFORMANCE_SKYS:
        if (!openPerformanceSkys) {
          setOpenProjects(false);
          setOpenProductionOverviewProjects(false);
          setOpenSalesProjects(false);
          setOpenPerformanceSkys(true);
          setOpenShopFloor(false);
          localStorage.setItem("open_project", "false");
          localStorage.setItem("open_production_overview_project", "false");
          localStorage.setItem("open_sales_project", "false");
          localStorage.setItem("open_performance_skys", "true");
          localStorage.setItem("open_shopfloor", "false");
        } else {
          setOpenPerformanceSkys(false);
          localStorage.setItem("open_performance_skys", "false");
        }
        break;

      case SidebarDropDownTypes.SHOPFLOOR:
        if (!openShopFloor) {
          setOpenProjects(false);
          setOpenProductionOverviewProjects(false);
          setOpenSalesProjects(false);
          setOpenPerformanceSkys(false);
          setOpenShopFloor(true);
          localStorage.setItem("open_project", "false");
          localStorage.setItem("open_production_overview_project", "false");
          localStorage.setItem("open_sales_project", "false");
          localStorage.setItem("open_performance_skys", "false");
          localStorage.setItem("open_shopfloor", "true");
        } else {
          setOpenShopFloor(false);
          localStorage.setItem("open_shopfloor", "false");
        }
        break;

      default:
        break;
    }
  };

  const projects: any = useAppSelector((state) => state.project.projects);

  const plannerRoute = {
    id: 1,
    label:
      role === UserRoles.ADMIN || role === UserRoles.PLANNER
        ? t("planner_dashboard")
        : t("op_dashboard"),
    path: "/",
    icon:
      role === UserRoles.ADMIN || role === UserRoles.PLANNER ? (
        <DashboardIcon
          sx={{ color: "rgba(34, 95, 166, 1)" }}
          width={20}
          height={20}
        />
      ) : (
        <Image
          src="/op_dashboard_icon.svg"
          width={20}
          height={20}
          alt="op-dashboard-icon"
        />
      ),
  };
  const projectRoute = {
    id: 2,
    label: t("projects"),
    icon: (
      <WorkIcon
        width={20}
        height={20}
        sx={{
          color: "rgba(34, 95, 166, 1)",
        }}
      />
    ),
    hasProjectChildItem: true,
    onClick: () => onFetchProjects(SidebarDropDownTypes.PROJECTS),
  };
  const salesRoute = {
    id: 3,
    label: t("sales_dashboard"),
    path: "/sales_dashboard",
    icon: (
      <Image src="/sales_icon.svg" width={20} height={20} alt="sales-icon" />
    ),
    hasProjectChildItem: true,
    onClick: () => onFetchProjects(SidebarDropDownTypes.SALES_DASHBOARD),
  };
  const productionOverviewRoute = {
    id: 3,
    label: t("production_overview"),
    icon: (
      <Image src="/build.svg" width={25} height={25} alt="op-dashboard-icon" />
    ),
    hasProjectChildItem: true,
    onClick: () => onFetchProjects(SidebarDropDownTypes.PRODUCTION_OVERVIEW),
  };
  const machinePerformanceRoute = {
    id: 4,
    label: t("machine_performance"),
    icon: (
      <Image
        src="/machine_performance_icon.svg"
        width={25}
        height={25}
        alt="machine-performance-icon"
      />
    ),
    hasProjectChildItem: false,
    path: "/machinePerformance",
  };
  const operatorMachinesRoute = {
    id: 5,
    label: t("operator_machines"),
    icon: (
      <PrecisionManufacturingIcon
        sx={{
          color: "rgba(34, 95, 166, 1)",
        }}
      />
    ),
    hasProjectChildItem: false,
    path: "/operator",
  };
  const shopFloorRoute = {
    id: 6,
    label: t("shopfloor"),
    icon: (
      <SettingsApplicationsRoundedIcon
        sx={{
          color: "rgba(34, 95, 166, 1)",
        }}
      />
    ),
    hasProjectChildItem: true,
    path: "/shopFloor",
    onClick: () => onFetchProjects(SidebarDropDownTypes.SHOPFLOOR),
  };
  const performanceSkysRoute = {
    id: 7,
    label: t("performance_skys"),
    path: "/performanceSkys",
    icon: (
      <TrendingUpRounded
        sx={{
          color: "rgba(34, 95, 166, 1)",
        }}
      />
    ),
    hasProjectChildItem: true,
    onClick: () => onFetchProjects(SidebarDropDownTypes.PERFORMANCE_SKYS),
  };

  const renderDashboard = () => {
    return (
      <Link
        href={plannerRoute.path}
        style={{ textDecoration: "none" }}
        key={plannerRoute.id}
      >
        <MenuItem
          selected={activeRoute(
            pathname,
            plannerRoute.path,
            undefined,
            searchParams
          )}
          key={1}
          sx={styles.menuItem}
        >
          <ListItemIcon>{plannerRoute.icon}</ListItemIcon>
          <ListItemText
            primaryTypographyProps={
              activeRoute(pathname, plannerRoute.path, undefined, searchParams)
                ? styles.selectedStyle
                : styles.baseStyle
            }
            primary={plannerRoute.label}
          />
        </MenuItem>
      </Link>
    );
  };

  const renderProjectRoute = () => {
    return (
      <>
        <MenuItem
          key={"projects"}
          sx={{
            ...styles.menuItem,
          }}
          selected={activeRoute(
            pathname,
            "projects",
            SidebarDropDownTypes.PROJECTS,
            searchParams
          )}
          onClick={projectRoute.onClick}
        >
          <ListItemIcon>{projectRoute.icon}</ListItemIcon>
          <ListItemText
            primaryTypographyProps={
              activeRoute(
                pathname,
                "projects",
                SidebarDropDownTypes.PROJECTS,
                searchParams
              )
                ? styles.selectedStyle
                : styles.baseStyle
            }
            primary={projectRoute.label}
          />
          {openProjects ? (
            <RemoveIcon
              sx={{
                width: "20px",
                height: "20px",
                ...styles.selectedStyle,
                color: "rgba(34, 95, 166, 1)",
              }}
            />
          ) : (
            <AddIcon
              sx={{
                width: "20px",
                height: "20px",
                ...styles.selectedStyle,
                color: "rgba(34, 95, 166, 1)",
              }}
            />
          )}
        </MenuItem>
        {projectRoute.hasProjectChildItem &&
        openProjects &&
        projects &&
        projects.length > 0 ? (
          <List key="project-list" sx={styles.projectList}>
            {displayProjects(SidebarDropDownTypes.PROJECTS)}
          </List>
        ) : null}
      </>
    );
  };

  const renderProductionOverviewRoute = () => {
    return (
      <>
        <MenuItem
          sx={styles.menuItem}
          selected={activeRoute(
            pathname,
            "production_overview",
            undefined,
            searchParams
          )}
          key={"production-overview"}
          onClick={productionOverviewRoute.onClick}
        >
          <ListItemIcon>{productionOverviewRoute.icon}</ListItemIcon>
          <ListItemText
            primaryTypographyProps={
              activeRoute(
                pathname,
                "production_overview",
                undefined,
                searchParams
              )
                ? styles.selectedStyle
                : styles.baseStyle
            }
            primary={productionOverviewRoute.label}
          />
          {openProductionOverviewProjects ? (
            <RemoveIcon
              sx={{
                width: "20px",
                height: "20px",
                ...styles.selectedStyle,
                color: "rgba(34, 95, 166, 1)",
              }}
            />
          ) : (
            <AddIcon
              sx={{
                width: "20px",
                height: "20px",
                ...styles.selectedStyle,
                color: "rgba(34, 95, 166, 1)",
              }}
            />
          )}
        </MenuItem>
        {productionOverviewRoute.hasProjectChildItem &&
        openProductionOverviewProjects &&
        projects &&
        projects.length > 0 ? (
          <List key="production-overview-list" sx={styles.projectList}>
            {displayProjects(SidebarDropDownTypes.PRODUCTION_OVERVIEW)}
          </List>
        ) : null}
      </>
    );
  };

  const renderSalesRoute = () => {
    return (
      <>
        <MenuItem
          sx={styles.menuItem}
          selected={activeRoute(
            pathname,
            "sales_dashboard",
            undefined,
            searchParams
          )}
          key={"sales-dashboard"}
          onClick={salesRoute.onClick}
        >
          <ListItemIcon>{salesRoute.icon}</ListItemIcon>
          <ListItemText
            primaryTypographyProps={
              activeRoute(pathname, "sales_dashboard", undefined, searchParams)
                ? styles.selectedStyle
                : styles.baseStyle
            }
            primary={salesRoute.label}
          />
          {openSalesProjects ? (
            <RemoveIcon
              sx={{
                width: "20px",
                height: "20px",
                ...styles.selectedStyle,
                color: "rgba(34, 95, 166, 1)",
              }}
            />
          ) : (
            <AddIcon
              sx={{
                width: "20px",
                height: "20px",
                ...styles.selectedStyle,
                color: "rgba(34, 95, 166, 1)",
              }}
            />
          )}
        </MenuItem>
        {salesRoute.hasProjectChildItem &&
        openSalesProjects &&
        projects &&
        projects.length > 0 ? (
          <List key="sales-dashboard-list" sx={styles.projectList}>
            {displayProjects(SidebarDropDownTypes.SALES_DASHBOARD)}
          </List>
        ) : null}
      </>
    );
  };

  const renderMachinePerformanceRoute = () => {
    return (
      <Link
        href={machinePerformanceRoute.path}
        style={{ textDecoration: "none" }}
        key={machinePerformanceRoute.id}
      >
        <MenuItem
          selected={activeRoute(
            pathname,
            machinePerformanceRoute.path,
            undefined,
            searchParams
          )}
          key={1}
          sx={styles.menuItem}
        >
          <ListItemIcon>{machinePerformanceRoute.icon}</ListItemIcon>
          <ListItemText
            primaryTypographyProps={
              activeRoute(
                pathname,
                machinePerformanceRoute.path,
                undefined,
                searchParams
              )
                ? styles.selectedStyle
                : styles.baseStyle
            }
            primary={machinePerformanceRoute.label}
          />
        </MenuItem>
      </Link>
    );
  };
  const renderOperatorMachineRoute = () => {
    return (
      <Link
        href={operatorMachinesRoute.path}
        style={{ textDecoration: "none" }}
        key={operatorMachinesRoute.id}
      >
        <MenuItem
          selected={activeRoute(pathname, operatorMachinesRoute.path)}
          key={1}
          sx={styles.menuItem}
        >
          <ListItemIcon>{operatorMachinesRoute.icon}</ListItemIcon>
          <ListItemText
            primaryTypographyProps={
              activeRoute(
                pathname,
                operatorMachinesRoute.path,
                undefined,
                searchParams
              )
                ? styles.selectedStyle
                : styles.baseStyle
            }
            primary={operatorMachinesRoute.label}
          />
        </MenuItem>
      </Link>
    );
  };
  const displayShopFloorProjects = () => {
    const type = SidebarDropDownTypes.SHOPFLOOR;
    const projects = [
      // {
      //   id: 1,
      //   projectName: "Factory 1",
      // },
      // {
      //   id: 2,
      //   projectName: "Factory 2",
      // },
      {
        id: 4,
        projectName: "Factory 4",
      },
    ];

    const displayedProjects = projects.map(
      (project: Project, index: number) => (
        <Box
          key={`factory-${index}-${project.id}`}
          sx={{
            backgroundColor: activeRoute(
              pathname,
              project.id.toString(),
              type,
              searchParams
            )
              ? "var(--primary-light, #D5E3FF);"
              : "transparent",
            marginX: "1vw",
          }}
        >
          <Link
            href={generateSidebarUrl(project, type)}
            style={{
              textDecoration: "none",
              backgroundColor: ".active black !important",
            }}
          >
            <MenuItem
              sx={styles.menuItem}
              selected={activeRoute(
                pathname,
                generateSidebarUrl(project, type),
                type,
                searchParams
              )}
              key={index}
            >
              <ListItemIcon></ListItemIcon>
              <ListItemText
                primaryTypographyProps={
                  activeRoute(
                    pathname,
                    project.id.toString(),
                    type,
                    searchParams
                  )
                    ? styles.selectedStyle
                    : styles.defaultProject
                }
                primary={project.projectName}
              />
            </MenuItem>
          </Link>
        </Box>
      )
    );
    return displayedProjects;
  };

  const renderShopFloorRoute = () => {
    return (
      <>
        <MenuItem
          sx={styles.menuItem}
          selected={activeRoute(
            pathname,
            shopFloorRoute.path,
            undefined,
            searchParams
          )}
          key={"shopfloor"}
          onClick={shopFloorRoute.onClick}
        >
          <ListItemIcon>{shopFloorRoute.icon}</ListItemIcon>
          <ListItemText
            primaryTypographyProps={
              activeRoute(
                pathname,
                shopFloorRoute.path,
                undefined,
                searchParams
              )
                ? styles.selectedStyle
                : styles.baseStyle
            }
            primary={shopFloorRoute.label}
          />
          {openShopFloor ? (
            <RemoveIcon
              sx={{
                width: "20px",
                height: "20px",
                ...styles.selectedStyle,
                color: "rgba(34, 95, 166, 1)",
              }}
            />
          ) : (
            <AddIcon
              sx={{
                width: "20px",
                height: "20px",
                ...styles.selectedStyle,
                color: "rgba(34, 95, 166, 1)",
              }}
            />
          )}
        </MenuItem>
        {shopFloorRoute.hasProjectChildItem &&
        openShopFloor &&
        projects &&
        projects.length > 0 ? (
          <List key="shopfloor-list" sx={styles.projectList}>
            {displayShopFloorProjects()}
          </List>
        ) : null}
      </>
    );
  };
  const renderPerformanceSkysRoute = () => {
    return (
      <>
        <MenuItem
          sx={styles.menuItem}
          selected={activeRoute(
            pathname,
            performanceSkysRoute.path,
            undefined,
            searchParams
          )}
          key={"performance-skys"}
          onClick={performanceSkysRoute.onClick}
        >
          <ListItemIcon>{performanceSkysRoute.icon}</ListItemIcon>
          <ListItemText
            primaryTypographyProps={
              activeRoute(
                pathname,
                performanceSkysRoute.path,
                undefined,
                searchParams
              )
                ? styles.selectedStyle
                : styles.baseStyle
            }
            primary={performanceSkysRoute.label}
          />
          {openPerformanceSkys ? (
            <RemoveIcon
              sx={{
                width: "20px",
                height: "20px",
                ...styles.selectedStyle,
                color: "rgba(34, 95, 166, 1)",
              }}
            />
          ) : (
            <AddIcon
              sx={{
                width: "20px",
                height: "20px",
                ...styles.selectedStyle,
                color: "rgba(34, 95, 166, 1)",
              }}
            />
          )}
        </MenuItem>
        {performanceSkysRoute.hasProjectChildItem &&
        openPerformanceSkys &&
        projects &&
        projects.length > 0 ? (
          <List key="performance-skys-list" sx={styles.projectList}>
            {displayPerformanceSkysProjects()}
          </List>
        ) : null}
      </>
    );
  };

  const displayPerformanceSkysProjects = () => {
    const type = SidebarDropDownTypes.PERFORMANCE_SKYS;
    const projects = [
      {
        id: 1,
        projectName: "AeroEngines",
      },
      {
        id: 2,
        projectName: "AeroStructures",
      },
    ];

    const displayedProjects = projects.map(
      (project: Project, index: number) => (
        <Box
          key={`project-${index}-${project.id}`}
          sx={{
            backgroundColor: activeRoute(
              pathname,
              project.id.toString(),
              type,
              searchParams
            )
              ? "var(--primary-light, #D5E3FF);"
              : "transparent",
            marginX: "1vw",
          }}
        >
          <Link
            href={generateSidebarUrl(project, type)}
            style={{
              textDecoration: "none",
              backgroundColor: ".active black !important",
            }}
          >
            <MenuItem
              sx={styles.menuItem}
              selected={activeRoute(
                pathname,
                generateSidebarUrl(project, type),
                type,
                searchParams
              )}
              key={index}
            >
              <ListItemIcon></ListItemIcon>
              <ListItemText
                primaryTypographyProps={
                  activeRoute(
                    pathname,
                    project.id.toString(),
                    type,
                    searchParams
                  )
                    ? styles.selectedStyle
                    : styles.defaultProject
                }
                primary={project.projectName}
              />
            </MenuItem>
          </Link>
        </Box>
      )
    );
    return displayedProjects;
  };

  const displayProjects = (type: SidebarDropDownTypes) => {
    let projectsByBusinessSegment: { [key: string]: Project[] } = groupBy(
      projects,
      "businessSegment"
    );
    let displayedProjects = [];
    for (const key of Object.keys(projectsByBusinessSegment).reverse()) {
      displayedProjects.push(
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            marginLeft: "2vw",
          }}
          subheader={
            <ListSubheader sx={{color: '#000'}}>
              {key === "AS" ? "AeroStructures" : "AeroEngines"}
            </ListSubheader>
          }
        >
          {projectsByBusinessSegment[key].map(
            (project: Project, index: number) => (
              <Box
                key={`project-${index}-${project.id}`}
                sx={{
                  backgroundColor: activeRoute(
                    pathname,
                    project.id.toString(),
                    type,
                    searchParams
                  )
                    ? "var(--primary-light, #D5E3FF);"
                    : "transparent",
                  marginX: "-1vw",
                }}
              >
                <Link
                  href={generateSidebarUrl(project, type)}
                  style={{
                    textDecoration: "none",
                    backgroundColor: ".active black !important",
                  }}
                >
                  <MenuItem
                    sx={styles.menuItem}
                    selected={activeRoute(
                      pathname,
                      generateSidebarUrl(project, type),
                      type,
                      searchParams
                    )}
                    key={index}
                  >
                    <ListItemIcon></ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={
                        activeRoute(
                          pathname,
                          project.id.toString(),
                          type,
                          searchParams
                        )
                          ? styles.selectedStyle
                          : styles.defaultProject
                      }
                      primary={project.projectName}
                    />
                  </MenuItem>
                </Link>
              </Box>
            )
          )}
        </List>
      );
    }
    const allProject = {
      id: 0,
      projectName: t("all_projects"),
    };
    if (type === SidebarDropDownTypes.SALES_DASHBOARD) {
      displayedProjects.unshift(
        <Box
          key={`project-${allProject.id}`}
          sx={{
            backgroundColor: activeRoute(
              pathname,
              allProject.id.toString(),
              undefined,
              searchParams
            )
              ? "var(--primary-light, #D5E3FF);"
              : "transparent",
            marginX: "-1vw",
          }}
        >
          <Link
            href={generateSidebarUrl(allProject, type)}
            style={{
              textDecoration: "none",
              backgroundColor: ".active black !important",
            }}
          >
            <MenuItem
              sx={styles.menuItem}
              selected={activeRoute(
                pathname,
                generateSidebarUrl(allProject, type),
                undefined,
                searchParams
              )}
              key={0}
            >
              <ListItemIcon></ListItemIcon>
              <ListItemText
                primaryTypographyProps={
                  activeRoute(
                    pathname,
                    allProject.id.toString(),
                    type,
                    searchParams
                  )
                    ? styles.selectedStyle
                    : styles.defaultProject
                }
                primary={allProject.projectName}
              />
            </MenuItem>
          </Link>
        </Box>
      );
    }
    return displayedProjects;
  };

  return (
    <>
      {open ? (
        <StyledDrawer variant="persistent" anchor="left" open={open}>
          <List style={{ marginTop: "50px" }}>
            {!hasUserRole(role, UserRoles.OPERATOR) && renderDashboard()}
            {!hasUserRole(role, UserRoles.OPERATOR) && renderProjectRoute()}
            {(hasUserRole(role, UserRoles.ADMIN) ||
              hasUserRole(role, UserRoles.SALES)) &&
              renderSalesRoute()}
            {(hasUserRole(role, UserRoles.ADMIN) ||
              hasUserRole(role, UserRoles.PLANNER) ||
              hasUserRole(role, UserRoles.SALES) ||
              hasUserRole(role, UserRoles.OPERATOR_MANAGER)) &&
              renderProductionOverviewRoute()}
            {renderPerformanceSkysRoute()}
            {(hasUserRole(role, UserRoles.ADMIN) ||
              hasUserRole(role, UserRoles.OPERATOR_MANAGER)) &&
              renderMachinePerformanceRoute()}
            {renderOperatorMachineRoute()}
            {renderShopFloorRoute()}
          </List>
        </StyledDrawer>
      ) : (
        <ClosedDrawer variant="persistent" anchor="left" open={!open} />
      )}
    </>
  );
}
