import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

import { FileData } from "../../utils/types";
import {
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { FileRowIdSx, FileRowNameSx, FileRowUrlSx } from "../../utils/sxObj";

type FileRowProps = {
  file: FileData;
};
export function FileRow({ file }: FileRowProps) {
  const handleDownload = () => {
    let hiddenElement = document.createElement("a");
    hiddenElement.href = encodeURI(file.url);
    hiddenElement.download = file.filename;
    hiddenElement.click();
  };

  return (
    <ListItem
      disablePadding
      secondaryAction={
        <IconButton color="secondary" onClick={handleDownload}>
          <CloudDownloadIcon />
        </IconButton>
      }
    >
      <ListItemButton>
        <ListItemText sx={FileRowIdSx} primary={file.id} />
        <ListItemText sx={FileRowNameSx} primary={file.filename} />
        <ListItemText sx={FileRowUrlSx} primary={file.url} />
      </ListItemButton>
    </ListItem>
  );
}
