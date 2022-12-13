export interface FileData {
  id: number;
  filename: string;
  url: string;
}

export interface GetFileList {
  fileList: Array<FileData>;
}

export interface UploadedFile {
  uploadFile: FileData;
}
