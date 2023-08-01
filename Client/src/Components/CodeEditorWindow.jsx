import React, { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import "./QuestionPage.css";

const CodeEditorWindow = ({ onChange, language, code, theme }) => {
	
	const handleEditorChange = (value) => {
		onChange(value);
	};

	return (
		<div style={{ borderRadius: "5px", overflow: "hidden" }}>
			<Editor
				height={"75vh"}
				language={language || "javascript"}
				value={code}
				theme={"vs-dark"}
				onChange={handleEditorChange}
				sx={{ borderRadius: "50px" }}
				className="editor"
				options={{
					// You can also provide other options for the editor
					fontSize: 20,
					minimap: {
					  enabled: true,
					},
				  }}
			/>
		</div>
	);
};
export default CodeEditorWindow;
