import React from "react";
import MDEditor from "@uiw/react-md-editor";

const MarkdownEditorComponent = (props) => {
  const { value, setValue } = props;
  return (
    <>
      <MDEditor value={value} onChange={setValue} />
    </>
  );
};
export default MarkdownEditorComponent;
