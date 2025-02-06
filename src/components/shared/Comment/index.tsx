import { removeEmail } from "@/utils/utils";
import { Typography } from "@mui/material";

const highLightMentions = (text: string, isCell?: boolean) => {
  const regex = /[@]/gi;

  let formattedText = removeEmail(text);

  if (isCell && formattedText.length > 54) {
    formattedText = formattedText.substring(0, 42) + "...";
  }
  // Split the text into parts based on the regex pattern
  const parts = formattedText.split(" ");

  // Iterate through parts and wrap mentions in <span> with blue color style
  return parts.map((part, index) => {
    if (part.match(regex)) {
      return (
        <Typography key={index} component="span" color="primary">
          {part.replaceAll(regex, "") + " "}
        </Typography>
      );
    }
    return (
      <Typography key={index} component="span">
        {part + " "}
      </Typography>
    );
  });
};

export interface LatestCommentProps {
  comment: string;
  isCell?: boolean;
}

export const Comment = ({ comment, isCell }: LatestCommentProps) => {
  if (comment) return highLightMentions(comment, isCell);
  else return <>-</>;
};
