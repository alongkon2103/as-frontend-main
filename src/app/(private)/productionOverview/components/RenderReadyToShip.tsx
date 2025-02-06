import {
  DateRangeProps,
  OverdueProps,
  ReadyToShipProps,
} from "@/store/features/ProductionOverview/ProductionOverviewSlice";
import { Box, Modal, Typography, Button, Grid } from "@mui/material";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import React, { useState } from "react";
import { CoCard, CoExtraProps } from "./RenderCoCard";
import { getThemedStyles } from "./styles";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "next/navigation";
import dayjs from "dayjs";
import { LightBackgroundTooltip } from "@/components/production_overview/tooltips/general";
import {
  greenBackground,
  greenText,
  orangeBackground,
  orangeText,
  redBackground,
  redText,
} from "@/utils/utils";
import CloseButton from "@/components/shared/CloseButton";
import { ReadyToShipToolTips } from "@/components/production_overview/tooltips/ready_to_ship";

function RenderReadyToShip({
  item,
  rowIndex,
  itemIndex,
}: {
  item: OverdueProps | DateRangeProps;
  rowIndex: number;
  itemIndex: 0 | 1 | 2;
}) {
  const styles = getThemedStyles();
  const [openModal, setOpenModal] = useState(false);
  const [readyToShipItems, setReadyToShipItems] = useState<ReadyToShipProps[]>(
    []
  );
  const [extraData, setExtraData] = useState<CoExtraProps | undefined>(
    undefined
  );
  const [readyToShipModal, setReadyToShipModal] = useState(false);
  const [readyToShipItem, setReadyToShipItem] =
    useState<ReadyToShipProps | null>(null);
  const projectId = useSearchParams().get("id");
  const { t } = useTranslation();

  const getBackgroundColor = (item: { color: string }) => {
    switch (item.color) {
      case "red":
        return redBackground;
      case "green":
        return greenBackground;
      case "yellow":
        return orangeBackground;
      default:
        return "";
    }
  };

  function viewReadyToShipPopup(readyToShip: ReadyToShipProps[]) {
    setReadyToShipItems(readyToShip);
    setReadyToShipModal(true);
  }
  const getTextColor = (item: { color: string }) => {
    switch (item.color) {
      case "red":
        return redText;
      case "green":
        return greenText;
      case "yellow":
        return orangeText;
      default:
        return "";
    }
  };

  const renderLatestComment = (message: string) => {
    if (message.length < 15) return <Typography> {message} </Typography>;
    else
      return (
        <LightBackgroundTooltip title={message}>
          <Button sx={{ color: "black", fontWeight: 400, padding: 0 }}>
            {`"${message.substring(0, 15)}..."`}
          </Button>
        </LightBackgroundTooltip>
      );
  };

  const renderReadyToShipObject = (
    readyToShip: ReadyToShipProps,
    index: number,
    rowIndex: number,
    itemIndex: 0 | 1 | 2,
    length: number,
    noBorder: boolean = false
  ) => {
    return (
      <LightBackgroundTooltip
        minWidth={940}
        title={<ReadyToShipToolTips readyToShipHoverData={readyToShip} />}
      >
        <Button
          style={{
            padding: "0px",
            border: "none",
            width: length > 2 ? "47%": "46%",
            borderRadius: "0px",
            textDecoration: "none",
          }}
          onClick={() => {
            setReadyToShipItem(readyToShip);
            setExtraData({
              index,
              rowIndex,
              itemIndex,
            });
            setOpenModal(true);
          }}
        >
          <Box
            sx={{
              backgroundColor: getBackgroundColor(readyToShip),
              heigth: "100%",
              paddingTop: "12px",
              borderRight: noBorder ? "none" : "0.1px solid rgba(0,0,0,0.15)",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                padding: "0px 5px",
                minWidth: "400px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "2px",
                }}
              >
                <Typography
                  sx={{
                    color: getTextColor(readyToShip),
                    textDecoration: "underline",
                    marginTop: 0,
                    paddingTop: 0,
                    textAlign: "top",
                    alignItems: "top",
                    cursor: "pointer",
                  }}
                >
                  {readyToShip.coNum}-{readyToShip.coLine}
                </Typography>
                <Typography
                  sx={{
                    color: getTextColor(readyToShip),
                  }}
                >
                  {readyToShip?.coDate
                    ? dayjs(readyToShip.coDate).format("DD/MM/YYYY")
                    : "-"}
                </Typography>
                <Box sx={{ display: "flex", gap: "2px" }}>
                  <StickyNote2Icon color="primary" width={1} height={1} />{" "}
                  <Typography color="primary">
                    {readyToShip.ordered ?? "-"}
                  </Typography>
                  <Typography sx={{ color: getTextColor(readyToShip) }}>
                    {"FG:"} {readyToShip.fg ?? "-"}
                  </Typography>
                  <LocalShippingIcon
                    sx={{ color: getTextColor(readyToShip) }}
                  />{" "}
                  <Typography sx={{ color: getTextColor(readyToShip) }}>
                    {readyToShip.shipped ?? "-"}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      color: "black",
                      textTransform: "none",
                    }}
                  >
                    {t("projected_date")}
                  </Typography>
                  <Typography sx={{ color: "black" }}>
                    {readyToShip?.projectedDate
                      ? dayjs(readyToShip.projectedDate).format("DD/MM/YYYY")
                      : "-"}
                  </Typography>
                </>
                <Box sx={{ minWidth: "150px" }}>
                  {renderLatestComment(readyToShip.message)}
                </Box>
              </Box>
            </Box>
          </Box>
        </Button>
      </LightBackgroundTooltip>
    );
  };

  const renderReadyToShipMessage = (
    readyToShip: ReadyToShipProps,
    index: number,
    rowIndex: number,
    itemIndex: 0 | 1 | 2,
    length: number,
    noBorder: boolean = false
  ) => {
    return (
      <LightBackgroundTooltip
        minWidth={940}
        title={<ReadyToShipToolTips readyToShipHoverData={readyToShip} />}
      >
        <Button
          style={{
            padding: "0px",
            border: "none",
            width: length > 2 ? "47%": "46%",
            borderRadius: "0px",
            textDecoration: "none",
          }}
          onClick={() => {
            setExtraData({
              index,
              rowIndex,
              itemIndex,
            });
            setReadyToShipItem(readyToShip);
            setOpenModal(true);
          }}
        >
          <Box
            sx={{
              backgroundColor: getBackgroundColor(readyToShip),
              color: getTextColor(readyToShip),
              display: "flex",
              alignItems: "center",
              height: "100%",
              minWidth: "300px",
              width: "100%",
              padding: "10px",
              borderRight: noBorder ? "none" : "0.1px solid rgba(0,0,0,0.15)",
            }}
          >
            <Typography sx={{ color: getTextColor(readyToShip) }}>
              {t("projected_for")}
            </Typography>
            <Typography
              sx={{
                color: getTextColor(readyToShip),
                textDecoration: "underline",
                marginLeft: "4px",
                cursor: "pointer",
              }}
            >
              {readyToShip.coNum}-{readyToShip.coLine}
            </Typography>
            <Typography
              sx={{
                marginLeft: "4px",
                color: getTextColor(readyToShip),
              }}
            >
              {readyToShip?.projectedDate
                ? dayjs(readyToShip.projectedDate).format("DD/MM/YY")
                : "-"}
            </Typography>
          </Box>
        </Button>
      </LightBackgroundTooltip>
    );
  };

  const renderReadyToShip = (
    item: OverdueProps | DateRangeProps,
    rowIndex: number,
    itemIndex: 0 | 1 | 2
  ) => {
    const length = item?.readyToShip?.length ?? 0;
    if (item?.readyToShip && length > 0) {
      return (
        <>
          <Box
            sx={{
              display: "flex",
              minWidth: "100px",
              minHeight: "70px",          
            }}
          >
            {item?.readyToShip.slice(0, 2).map((readyToShip, index) => {
              if (readyToShip.type === "object") {
                return renderReadyToShipObject(
                  readyToShip,
                  index,
                  rowIndex,
                  itemIndex,
                  length
                );
              } else {
                return renderReadyToShipMessage(
                  readyToShip,
                  index,
                  rowIndex,
                  itemIndex,
                  length
                );
              }
            })}
            {length > 2 && (
              <Button
                variant="text"
                sx={{
                  textDecoration: "underline",
                  textTransform: "capitalize",
                }}
                onClick={() =>
                  viewReadyToShipPopup(item?.readyToShip as ReadyToShipProps[])
                }
              >
                {t("view_all")}
              </Button>
            )}
            <Modal
              open={openModal}
              onClose={() => {}}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <Box sx={styles.coCardModal}>
                <CoCard
                  item={readyToShipItem as ReadyToShipProps}
                  extraData={extraData}
                  projectId={parseInt(projectId as string)}
                  onClose={() => {
                    setOpenModal(false);
                  }}
                />
              </Box>
            </Modal>
            <Modal
              open={readyToShipModal}
              onClose={() => setReadyToShipModal(false)}
              aria-labelledby="child-modal-title"
              aria-describedby="child-modal-description"
            >
              <Box sx={{ ...styles.readyToShipModal, padding: "1vw" }}>
                <Grid container spacing={2}>
                  <Grid
                    item
                    xs={12}
                    display={"flex"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography
                      sx={{
                        fontFamily: "Roboto",
                        fontSize: "24px",
                        fontStyle: "normal",
                        fontWeight: "700",
                        lineHeight: "normal",
                      }}
                    >
                      {t("all_overdue")}
                    </Typography>
                    <CloseButton onClose={() => setReadyToShipModal(false)} />
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    marginTop: "1vh",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  {readyToShipItems.map((readyToShip, index) => {
                    if (readyToShip.type === "object") {
                      return renderReadyToShipObject(
                        readyToShip,
                        index,
                        rowIndex,
                        itemIndex,
                        length,
                        true
                      );
                    } else {
                      return renderReadyToShipMessage(
                        readyToShip,
                        index,
                        rowIndex,
                        itemIndex,
                        length,
                        true
                      );
                    }
                  })}
                </Box>
              </Box>
            </Modal>
          </Box>
        </>
      );
    } else {
      return <Typography sx={{ paddingLeft: "10px" }}>-</Typography>;
    }
  };
  return renderReadyToShip(item, rowIndex, itemIndex);
}

export default RenderReadyToShip;
