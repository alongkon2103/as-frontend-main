import { Compress, Expand } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";

interface CompactButtonProps {
  isCompact: boolean;
  handleCompact: (full: boolean) => void;
}

export const CompactButton: React.FC<CompactButtonProps> = ({
  isCompact,
  handleCompact,
}) => {
  return !isCompact ? (
    <IconButton
      sx={{ width: "30px", height: "30px" }}
      onClick={() => {
        handleCompact(!isCompact);
      }}
    >
      <Tooltip title="Expand">
        <Expand
          sx={{
            color: "#225FA6",
            width: "30px",
            height: "30px",
            transform: "rotate(90deg)",
          }}
        />
      </Tooltip>
    </IconButton>
  ) : (
    <IconButton
      sx={{ width: "30px", height: "30px" }}
      onClick={() => {
        handleCompact(!isCompact);
      }}
    >
      <Tooltip title="Compress">
        <Compress
          sx={{
            color: "#225FA6",
            width: "30px",
            height: "30px",
            transform: "rotate(90deg)",
          }}
        />
      </Tooltip>
    </IconButton>
  );
};
