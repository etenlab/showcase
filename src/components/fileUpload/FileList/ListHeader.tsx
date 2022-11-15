import { ListItem, ListItemButton, ListItemText } from "@mui/material";
import { FileRowIdSx, FileRowNameSx, FileRowUrlSx } from "../utils/sxObj";

export function ListHeader() {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemText sx={FileRowIdSx} primary={<b>ID</b>} />
        <ListItemText sx={FileRowNameSx} primary={<b>NAME</b>} />
        <ListItemText sx={FileRowUrlSx} primary={<b>URL</b>} />
      </ListItemButton>
    </ListItem>
  );
}
