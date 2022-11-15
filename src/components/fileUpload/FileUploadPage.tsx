import { useState, useCallback } from "react";
import { useHistory } from "react-router";
import { useQuery, useMutation, gql } from "@apollo/client";

import { Stack, Button, IconButton } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";

import { client } from "src/common/fileGraphql";
import { GetFileList, UploadedFile } from "./utils/types";
import { FileList } from "./FileList";
import { FileUploader } from "./FileUploader";

const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      id
      filename
      url
    }
  }
`;

const GET_FILE_LIST = gql`
  query GetFileList {
    fileList {
      id
      filename
      url
    }
  }
`;

export function FileUploadPage() {
  const history = useHistory();
  const [inputtedFile, setInputtedFile] = useState<File | null>(null);
  const [uploadFile] = useMutation<UploadedFile>(UPLOAD_FILE, {
    client,
  });
  const { data: allFile, refetch } = useQuery<GetFileList | undefined>(
    GET_FILE_LIST,
    {
      client,
      fetchPolicy: "no-cache",
    }
  );

  const handleFileChange = useCallback((file: File) => {
    setInputtedFile(file);
  }, []);

  const handleUpload = () => {
    if (inputtedFile) {
      uploadFile({ variables: { file: inputtedFile } });
      setInputtedFile(null);
    }
  };

  const handleReload = () => {
    refetch();
  };

  return (
    <Stack
      justifyContent="space-between"
      spacing={2}
      sx={{ padding: "0px 20px", width: "100%" }}
    >
      <h1
        style={{
          borderBottom: "1px solid #8f8f8f",
          padding: "16px 0",
          margin: "0px",
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <span>File Upload</span>
          <Button
            onClick={() => {
              history.goBack();
            }}
          >
            Go Back
          </Button>
        </Stack>
      </h1>
      <Stack
        spacing={2}
        sx={{ height: "calc(100vh - 169px)", overflowY: "scroll" }}
      >
        <FileUploader onChangeFile={handleFileChange} />
        {inputtedFile && <p>{inputtedFile.name}</p>}

        <Stack direction="row" justifyContent="space-between">
          <Button
            disabled={inputtedFile === null}
            variant="contained"
            endIcon={<CloudUploadOutlinedIcon />}
            onClick={handleUpload}
          >
            Upload
          </Button>
          <IconButton onClick={handleReload} color="secondary">
            <CachedOutlinedIcon />
          </IconButton>
        </Stack>

        <FileList fileList={allFile?.fileList} />
      </Stack>
    </Stack>
  );
}
