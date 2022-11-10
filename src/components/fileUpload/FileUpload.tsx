import { useEffect, ChangeEventHandler } from "react";
import { useHistory } from "react-router";
import { useMutation, gql } from "@apollo/client";

import { Stack, Button } from "@mui/material";

import { client } from "src/common/fileGraphql";

const UPLOAD_FILE = gql`
  mutation UploadFile($file: Upload!) {
    uploadFile(file: $file) {
      id,
      filename,
      url
    }
  }
`;

export function FileUpload() {
  const history = useHistory();
  const [uploadFile, { data }] = useMutation(UPLOAD_FILE, { client });

  useEffect(() => {
    console.log(data);
  }, [data]);

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const inputElement = event.target;
    const fileList = inputElement.files;
    console.log(inputElement)
    console.log(fileList)
    if (fileList && fileList?.length > 0) {
      console.log(fileList[0]);
      uploadFile({ variables: { file: fileList[0] } });
    }
  };

  return (
    <Stack justifyContent="space-between" sx={{ padding: "0px 20px" }}>
      <h1 style={{ borderBottom: "1px solid #555" }}>
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
      <br />
      <input type="file" onChange={handleFileChange} />
    </Stack>
  );
}
