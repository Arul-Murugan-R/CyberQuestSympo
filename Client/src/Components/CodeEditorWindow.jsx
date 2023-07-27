import React, { useState,useEffect } from "react";
import Editor from "@monaco-editor/react";


const CodeEditorWindow = ({ onChange, language, code, theme }) => {
  const [value, setValue] = useState(code || "");
  // console.log(theme)
  // useEffect(() => {
  //   compileCode(value);
  // }, []);

  const handleEditorChange = (value) => {
    setValue(value);
    onChange(value)
  };

  return (
    <div style={{borderRadius:'5px',overflow:'hidden'}} >
      <Editor
      height={"75vh"}
        width={`900px`}
        language={language || "javascript"}
        value={value}
        theme={"vs-dark"}
        onChange={handleEditorChange}
        sx={{borderRadius:'50px'}}
      />
    </div>
  );
};
export default CodeEditorWindow;