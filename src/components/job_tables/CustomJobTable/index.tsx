import {
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Typography,
} from "@mui/material";
import { useTranslation } from "react-i18next";

export interface JobTableHeaderProps {
  headers: string[];
  hiddenHeaders: string[];
  sortBy: string;
  sortDirection: "asc" | "desc";
  handleSort: (sortBy: string) => void;
}

export const CustomJobTableHeader: React.FC<JobTableHeaderProps> = ({
  headers,
  hiddenHeaders,
  sortBy,
  sortDirection,
  handleSort,
}: JobTableHeaderProps) => {
  const { t } = useTranslation();

  const showHeaders = () => {
    const headerElements = [];
    for (let index = 0; index < headers.length; index++) {
      const header = headers[index];
      if (hiddenHeaders.includes(header.toLowerCase())) {
        continue;
      }
      const tableCell = (
        <TableCell
          key={index}
          sx={{ padding: "5px 5px 5px 10px", background: "#F4F7FA" }}
        >
          {header !== t("problems") &&
          header !== t("latest_comment") &&
          header !== t("action") ? (
            <TableSortLabel
              active={sortBy === header.toLowerCase()}
              direction={sortDirection}
              onClick={() => handleSort(header.toLowerCase())}
            >
              <Typography
                sx={{
                  fontFamily: "Roboto",
                  fontSize: "16px",
                  fontWeight: 800,
                }}
              >
                {header}
              </Typography>
            </TableSortLabel>
          ) : (
            <Typography
              sx={{
                fontFamily: "Roboto",
                fontSize: "16px",
                fontWeight: 800,
              }}
            >
              {header}
            </Typography>
          )}
        </TableCell>
      );
      headerElements.push(tableCell);
    }
    return headerElements;
  };

  return (
    <TableHead>
      <TableRow>{showHeaders()}</TableRow>
    </TableHead>
  );
};
