"use client";

import React, { useEffect, useState } from "react";
import CircleIcon from "@mui/icons-material/Circle";
import { getThemedStyles } from "./styles";
import NotificationIcon from "@mui/icons-material/Notifications";
import {
  Avatar,
  Badge,
  Box,
  Button,
  CircularProgress,
  Divider,
  Modal,
  Popover,
  Typography,
} from "@mui/material";
import {
  NotificationProps,
  fetchNotifications,
  markAllAsRead,
  readNotification,
} from "@/store/features/Notifications/NotificationSlice";
import dayjs from "dayjs";
import { NotificationCoCard } from "@/components/layout/Header/notifications/co-card";
import { JobCard } from "@/components/layout/Header/notifications/job-card";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CustomerOrderParams } from "@/store/features/CustomerOrder/CustomerOrderSlice";

interface NotificationItemProps {}

interface NotiJobProps {
  job: string;
  suffix: number;
  oper: number;
  projectId: string;
}

const Header: React.FC<NotificationItemProps> = () => {
  // const { i18n, t } = useTranslation();
  const [openCoModal, setOpenCoModal] = useState(false);
  const [openJobModal, setOpenJobModal] = useState(false);
  const [coData, setCoData] = useState<CustomerOrderParams | null>(null);
  const [jobData, setJobData] = useState<NotiJobProps | null>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [isMarkAllAsRead, setIsMarkAllAsRead] = useState(false);

  const [visibleCount, setVisibleCount] = useState(10);

  const dispatch = useAppDispatch();

  let { notifications, loading } = useAppSelector(
    (state) => state.notifications
  );
  notifications = notifications ?? [];
  const loadNotifications = () => {
    dispatch(fetchNotifications({}));
  };

  useEffect(() => {
    loadNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMarkAllAsRead]);

  const [displayNotifications, setDisplayNotifications] = useState<
    NotificationProps[]
  >(notifications.slice(0, visibleCount) ?? []);

  const handleScroll = (e: any) => {
    const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
    const scrollThreshold = 0;

    if (
      scrollHeight - scrollTop - clientHeight <= scrollThreshold &&
      displayNotifications.length < notifications.length
    ) {
      setVisibleCount((prevCount) => prevCount + 10);
      setDisplayNotifications(notifications.slice(0, visibleCount));
    }
  };

  const markAllAsReadOnClick = () => {
    callMarkAllAsRead();
    setIsMarkAllAsRead(true);
  };

  const today = dayjs();
  const todayNotifications = displayNotifications.filter((notification) => {
    const notificationDate = dayjs(notification.createDate);
    return notificationDate.isSame(today, "day");
  });
  const otherNotifications = displayNotifications.filter((notification) => {
    const notificationDate = dayjs(notification.createDate);
    return !notificationDate.isSame(today, "day");
  });
  const unreadCount =
    notifications.filter((notifications) => {
      return !notifications.isRead;
    }).length ?? 0;

  const styles = getThemedStyles();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // we need to load notifications here
    setIsMarkAllAsRead(false);
    loadNotifications();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const callMarkAllAsRead = () => {
    dispatch(markAllAsRead());
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const formatNotificationDate = (date: string) => {
    const inputDate = dayjs(date);

    // Get the current date
    const today = dayjs();

    // Calculate the difference in days
    const daysDifference = inputDate.diff(today, "day");

    // Format the date accordingly
    let formattedDate;

    if (daysDifference === 0) {
      // If the date is today
      formattedDate = `Today at ${inputDate.format("HH:mm")}`;
    } else {
      // If the date is in the future
      formattedDate = `${inputDate.format("DD/MM/YYYY")} at ${inputDate.format(
        "HH:mm"
      )}`;
    }
    return formattedDate;
  };

  const renderNotification = (
    notification: NotificationProps,
    index: number
  ) => {
    return (
      <>
        <Button
          fullWidth
          sx={{ textTransform: "none" }}
          onClick={() => {
            if (!notification.isRead) {
              dispatch(readNotification({ id: notification.id }));
            }
            if (notification.notificationType === "job_card") {
              setJobData(notification.notificationData);
              setTimeout(() => {
                setOpenJobModal(true);
              }, 500);
            } else {
              setCoData(notification.notificationData);
              setTimeout(() => {
                setOpenCoModal(true);
              }, 500);
            }
            setAnchorEl(null);
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
              minHeight: "80px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Box sx={{ width: "15%" }}>
                <Avatar>
                  {notification.userName && notification.userName.length > 0
                    ? notification.userName[0]
                    : " "}
                </Avatar>
              </Box>
              <Box textAlign={"left"} sx={{ width: "80%" }}>
                <Box sx={{ display: "flex", justifyContent: "left" }}>
                  <Typography
                    sx={{
                      fontSize: "14px",
                      fontWeight: 700,
                      color: "black",
                      marginRight: "5px",
                    }}
                  >
                    {notification.userName}{" "}
                  </Typography>
                  <Typography sx={{ fontSize: "14px", color: "#1B1F27" }}>
                    {" "}
                    {notification.message}
                  </Typography>
                </Box>
                <Typography
                  sx={{ fontSize: "14px", fontWeight: 700, color: "#225FA6" }}
                >
                  {notification.notificationType === "job_card"
                    ? "JOB#: "
                    : "CO#: "}{" "}
                  {notification.notificationType === "job_card"
                    ? `${notification.notificationData.job}-${notification.notificationData.suffix}`
                    : `${notification.notificationData.coNum}-${notification.notificationData.coLine}`}
                </Typography>
              </Box>
              {!isMarkAllAsRead && !notification.isRead && (
                <CircleIcon
                  color="error"
                  sx={{ width: "12px", height: "12px" }}
                />
              )}
            </Box>
            {notification.comment && (
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  textAlign: "left",
                  marginLeft: "15%",
                  marginRight: "20px",
                  marginTop: "10px",
                  backgroundColor: "var(--grey-primary-200, #EAEDF1)",
                  paddingLeft: "5px",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                  color: "#1B1F27",
                }}
              >
                {notification.comment}
              </Typography>
            )}
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                textAlign: "left",
                marginLeft: "15%",
                marginRight: "20px",
                paddingLeft: "5px",
                paddingTop: "16px",
                paddingBottom: "8px",
                color: "var(--text-secondary, rgba(0, 0, 0, 0.60))",
              }}
            >
              {formatNotificationDate(notification.createDate)}
            </Typography>
          </Box>
        </Button>
        <Divider sx={{ width: "100%" }} />
      </>
    );
  };

  return (
    <>
      <Badge
        badgeContent={unreadCount}
        color="error"
        onClick={handleClick}
        sx={{ cursor: "pointer" }}
      >
        <NotificationIcon sx={{ color: "rgba(34, 95, 166, 1)" }} />
      </Badge>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{ zIndex: 1401 }}
      >
        {loading && (
          <Box
            p={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <CircularProgress size={15} sx={{ marginRight: 3 }} />
            We are loading the notifications ... please wait.
          </Box>
        )}
        {!loading && notifications.length === 0 && (
          <Box
            p={2}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            There are no new notifications at this moment 😀
          </Box>
        )}
        {!loading && notifications.length > 0 && (
          <Box
            sx={{ width: "400px", maxHeight: "90vh", overflowY: "scroll" }}
            onScroll={handleScroll}
          >
            <Box
              p={1}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#EAEDF1",
              }}
            >
              <Typography sx={{ fontSize: "14px", fontWeight: 700 }}>
                Notifications
              </Typography>
              <Button
                variant="text"
                sx={{ fontSize: "14px", textTransform: "none" }}
                onClick={() => markAllAsReadOnClick()}
              >
                Mark all as read
              </Button>
            </Box>
            {todayNotifications.length > 0 && (
              <Typography
                ml={1}
                my={1}
                sx={{ color: "var(--text-secondary, rgba(0, 0, 0, 0.60))" }}
              >
                TODAY
              </Typography>
            )}
            <Box>
              {todayNotifications.map((item, index) =>
                renderNotification(item, index)
              )}
            </Box>
            {otherNotifications.length > 0 && (
              <Typography
                ml={1}
                my={1}
                sx={{ color: "var(--text-secondary, rgba(0, 0, 0, 0.60))" }}
              >
                OLDER
              </Typography>
            )}
            <Box>
              {otherNotifications.map((item, index) =>
                renderNotification(item, index)
              )}
            </Box>
          </Box>
        )}
      </Popover>
      {coData && (
        <Modal
          open={openCoModal}
          onClose={() => {}}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={styles.coCardModal}>
            <NotificationCoCard
              params={coData as CustomerOrderParams}
              onClose={() => {
                setCoData(null);
                setOpenCoModal(false);
              }}
            />
          </Box>
        </Modal>
      )}
      {jobData && (
        <Modal
          open={openJobModal}
          onClose={() => setOpenJobModal(false)}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={styles.jobDetailFilterModal}>
            <JobCard
              jobId={jobData.job}
              suffix={jobData.suffix}
              oper={jobData.oper}
              notiProjectId={jobData.projectId}
              onClose={() => {
                setJobData(null);
                setOpenJobModal(false);
              }}
            />
          </Box>
        </Modal>
      )}
    </>
  );
};

export default Header;
