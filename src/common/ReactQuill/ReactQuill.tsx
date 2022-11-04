import { useRef, useEffect } from 'react';
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";

type ReactQuillProps = {
  value: string;
  onKeyUp(event: any): void;
  onChange(text: string): void;
}

export function CustomReactQuill({value, onKeyUp, onChange}: ReactQuillProps) {
  const ref = useRef<any>();

  useEffect(() => {
    if (ref.current) {
      const editor = ref.current.getEditor();
      const keyboard = editor.getModule('keyboard');
      keyboard.bindings[13].unshift({
        key: 13,
        handler: () => {
          return false;
        }
      });
    }
  }, [])

  return (
    <ReactQuill
      ref={ref}
      theme="snow"
      value={value}
      onKeyUp={onKeyUp}
      onChange={onChange}
    />
  );
}
