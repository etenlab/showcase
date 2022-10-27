import { styled } from "@mui/material/styles";

export const PostContainer = styled("div")({
  position: "relative",
  padding: "8px",
  "&:hover": {
    background: "#f9f9f9",
    "& .emoji-controller": {
      opacity: 1,
    },
  },
  "& .emoji-controller": {
    opacity: 0,
  },
  transition: "0.3s",
});

export const EmojiController = styled("div")({
  position: "absolute",
  top: "0px",
  right: "0px",
  zIndex: 1000,
  transform: "translateY(-50%)",
  padding: "1px 2px",
  border: "1px solid #d7d7d7",
  borderRadius: "8px",
  background: "#fffff4",
  transition: "0.7s",
});

export const DateViewer = styled("span")({
  color: "#555",
  fontSize: "11px",
  margin: "10px",
});

export const AddReactionIconButton = styled('span')({
  padding: '0px 12px',
  border: '1px solid #eee',
  borderRadius: '12px',
  background: '#eee',
  color: '#9d9d9d',
  height: "24px",
  lineHeight: '27px',
  '&: hover': {
    background: "#fff",
    borderColor: "#a9a9a9"
  },
  '& svg': {
    fontSize: '17px'
  }
})