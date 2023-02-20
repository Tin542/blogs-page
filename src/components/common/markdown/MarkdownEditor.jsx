import React, { useContext } from "react";
import MDEditor, { commands, EditorContext } from "@uiw/react-md-editor";

const MarkdownEditorComponent = (props) => {
  const { value, setValue } = props;
  return (
    <>
      <MDEditor
        value={value}
        onChange={setValue}
        preview="edit"
        components={{
          toolbar: (command, disabled, executeCommand) => {
            if (command.keyCommand === "code") {
              return (
                <button
                  aria-label="Insert code"
                  disabled={disabled}
                  onClick={(evn) => {
                    evn.stopPropagation();
                    executeCommand(command, command.groupName);
                  }}>
                  Code
                </button>
              );
            }
          },
        }}
      />
    </>
  );
};
export default MarkdownEditorComponent;
