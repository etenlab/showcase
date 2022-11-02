import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

type ReactQuillProps = {
  value: string;
  onKeyUp(event: any): void;
  onChange(text: string): void;
}

export function CustomReactQuill({value, onKeyUp, onChange}: ReactQuillProps) {
  return (
    <ReactQuill
      theme="snow"
      value={value}
      onKeyUp={onKeyUp}
      onChange={onChange}
    />
  );
}
