import React from "react";
import MDEditor from "@uiw/react-md-editor";

const MarkdownViewComponent = (props) => {
    const {value} = props;
  return (
    <>
      <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} />
    </>
  );
};
export default MarkdownViewComponent;
