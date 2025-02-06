import { TableCell, Typography } from "@mui/material";

export const tableHeaderRowCellStyle = (props: any) => {
  return (
    <TableCell
      sx={{
        border: "none !important",
        borderLeft: "1px solid rgba(0,0,0,0.15) !important",
        padding: "5px 0 5px 15px !important",
      }}
      {...props}
    >
      <Typography fontSize={"14px"} fontWeight={700}>
        {props.column.title}
      </Typography>
    </TableCell>
  );
};
