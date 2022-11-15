import { List } from "@mui/material";

import { FileData } from "../utils/types";
import { ListHeader } from "./ListHeader";
import { FileRow } from "./FileRow";

type FileListProps = {
  fileList?: Array<FileData>;
};

export function FileList({ fileList }: FileListProps) {
  return (
    <List
      dense
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        border: "1px solid #a2a2a2",
        borderRadius: "8px",
      }}
    >
      <ListHeader />
      {fileList &&
        fileList.map((file) => <FileRow key={file.id} file={file} />)}
    </List>
  );
}
