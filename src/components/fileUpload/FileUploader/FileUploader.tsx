import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileUploaderContainer } from './styled';

type FileUploaderProps = {
  onChangeFile(file: File): void;
};

export function FileUploader({ onChangeFile }: FileUploaderProps) {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    multiple: false,
  });

  useEffect(() => {
    if (acceptedFiles.length > 0) {
      onChangeFile(acceptedFiles[0]);
    }
  }, [acceptedFiles, onChangeFile]);

  return (
    <>
      <FileUploaderContainer {...getRootProps()}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </FileUploaderContainer>
    </>
  );
}
