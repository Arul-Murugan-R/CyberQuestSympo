import React, { useState, useEffect } from "react";
import "./QuestionPage.css";
import CodeEditorWindow from "./CodeEditorWindow";
import { languageOptions } from "../data";
import { Select, MenuItem, CircularProgress } from "@mui/material";
import monacoThemes from "monaco-themes/themes/themelist";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { programAction } from "../store/ProgramStore";
import { snackActions } from "../store/SnackStore";
import { questionsData } from "../QuestionData";

let timer = setTimeout(() => null, 1000);

export default function QuestionPage() {
	const isLoggedin = useSelector((state) => state.auth.isLoggedIn);
	const userId = useSelector((state) => state.auth.teamId);
	const { id: questionNo } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	useEffect(() => {
		if (questionNo < 0 || questionNo > 6) {
			dispatch(
				snackActions.open({
					content: "Question Comprises of 1-6",
					type: "error",
				})
			);
			navigate("/");
		}
	}, []);
	const programs = useSelector((state) => state.programs);
	const loadCode = () => {
		let convert;
		const result = programs.find(
			(program) => program.questionNo === questionNo
		);
		if (result) {
			convert = JSON.parse(result.content);
			let language = result.language;
			let filteredCodeId = result.compilerId;
			return { convert, language, filteredCodeId };
		} else {
			return {
				convert: "",
				language: "javascript",
				filteredCodeId: "17",
			};
		}
	};
	const { convert, language: languageInitial, filteredCodeId } = loadCode();
	const [actualCode, setActualCode] = useState(convert);
	const [language, setLanguage] = useState(languageInitial);
	const [compilerId, setCompilerId] = useState(filteredCodeId);

	useEffect(() => {
		if (!isLoggedin) {
			return navigate("/login");
		}
	}, [isLoggedin, programs]);

	useEffect(() => {
		const { convert, language, filteredCodeId } = loadCode();
		setActualCode(convert);
		setLanguage(language);
		setCompilerId(filteredCodeId);
	}, [programs]);

	const [compiledCode, setCompiledCode] = useState("");
	const [loader, setLoader] = useState(false);
	const [sampleInput, setSampleInput] = useState("");
	const [compileError, setCompileError] = useState();

	const handleSelector = (event) => {
		const filteredLanguage = languageOptions.find(
			(lang) => lang.value == event.target.value
		);
		setLanguage(event.target.value);
		setCompilerId(filteredLanguage.compiler);
	};

	const inputChangeHandler = (event) => {
		setSampleInput(event.target.value);
	};

	const question = questionsData[questionNo - 1];

	const sampleTemplateForQuestion = (
		<div style={{ padding: 30 }}>
			<h3>{question.title}</h3>
			<p>
				Description: <br />
				{question.description.split(".").map((text) => {
					return (
						<>
							{text.trim()}. <br />
						</>
					);
				})}
			</p>
			<div
				style={{
					background: "#343434",
					padding: 15,
					margin: "20px 0px",
				}}
			>
				Example :<br />
				<pre style={{ color: "#ccc" }} key={question.no}>
					Sample Input : {question.sampleInput}
					<br />
					Sample Output : {question.sampleOutput}
					<br />
					<br />
					Explaination :<br />
					<ul style={{ marginLeft: "1rem" }}>
						{question.explanation.split(".").map((text) => {
							return (
								<li>
									{text.trim()}. <br />
								</li>
							);
						})}
					</ul>
				</pre>
			</div>
			Input Format
			<br />
			<br />
			A string as a input
			<br />
			<br />
			Constraints
			<br />
			<br />
			{`1 <= s.length <= 104`}
			<br />
			{`1 <= words.length <= 5000`}
			<br />
			{`1 <= words[i].length <= 30`}
			<br />
			{`s and words[i] consist of lowercase English letters.`}
			<br />
			<br />
			Sample Input 0<br />
			<div style={{ background: "#343434", padding: 10 }}>
				<pre style={{ color: "#ccc" }}>
					5<br />
					5<br />
					1 0 1<br />
					1 0 2<br />
					1 2 7<br />
					2 2 0<br />
					3 0<br />
				</pre>
			</div>
			Explanation 0<br />
			<br />
			There are shelves and requests, or queries.
			<br />
			- 1 Place a page book at the end of shelf .<br />
			- 2 Place a page book at the end of shelf .<br />
			- 3 Place a page book at the end of shelf .<br />
			- 4 The number of pages in the book on the shelf is 78.
			<br />
			- 5 The number of books on the shelf is 2.
			<br />
		</div>
	);

	const backendSaver = async (value) => {
		const result = await axios.post(
			import.meta.env.VITE_BACKEND_URL + "/program/save",
			{
				userId,
				questionNo,
				content: JSON.stringify(value),
				language,
				compilerId,
			}
		);
		if (result.status == 201) {
			dispatch(programAction.updateProgram(result.data.program));
			dispatch(
				snackActions.open({
					content: "Code Saved Successfully!",
					type: "success",
				})
			);
		}
	};

	const actualCodeHandler = (value) => {
		setActualCode(value);

		clearTimeout(timer);
		timer = setTimeout(async () => {
			backendSaver(value);
		}, 5000);
	};

	const compileCode = async () => {
		setCompiledCode("");
		setCompileError(null);
		setLoader(true);
		const url = import.meta.env.VITE_RAPID_API_URL;
		const options = {
			method: "POST",
			headers: {
				"content-type": "application/x-www-form-urlencoded",
				"X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
				"X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
			},
			body: new URLSearchParams({
				LanguageChoice: compilerId || "5",
				Program: actualCode,
				Input:
					sampleInput.length > 0 ? sampleInput : question.sampleInput,
			}),
		};

		// try {
		// const response = await fetch(url, options);
		// 	const result = await response.json();
		// 	if (result.Errors) {
		// 		throw result.Errors;
		// 	}
		// 	setCompiledCode(result.Result);
		// 	setLoader(false);
		// } catch (error) {
		// 	setLoader(false);
		// 	setCompileError(error);
		// }

		const opt = {
			method: "POST",
			url: "https://code-compiler10.p.rapidapi.com/",
			headers: {
				"content-type": "application/json",
				"x-compile": "rapidapi",
				"Content-Type": "application/json",
				"X-RapidAPI-Key":
					"ce7069d57cmsh0dc0f1006acffdbp1b7302jsn0e54f71632f7",
				"X-RapidAPI-Host": "code-compiler10.p.rapidapi.com",
			},
			data: {
				langEnum: [
					"php",
					"python",
					"c",
					"c_cpp",
					"csharp",
					"kotlin",
					"golang",
					"r",
					"java",
					"typescript",
					"nodejs",
					"ruby",
					"perl",
					"swift",
					"fortran",
					"bash",
				],
				lang: "python",
				code: 'print("Hello world")',
				input: "",
				// lang: language,
				// code: actualCode,
				// input: '"hello"',
				// sampleInput.length > 0 ? sampleInput : question.sampleInput,
			},
		};

		try {
			const response = await axios.request(opt);
			console.log(response);
		} catch (error) {
			console.error(error);
		}
		setLoader(false);
	};

	return (
		<>
			<div className="QuestionDiv">
				<div className="QuestionContainer">
					{sampleTemplateForQuestion}
				</div>
				<div className="codeContainer">
					<div className="top">
						<Select
							value={language}
							displayEmpty
							onChange={handleSelector}
							sx={{
								width: "150px",
								color: "black",
								height: "40px",
								background: "#fff",
								margin: "10px 0px",
								outline: "none",
								boxShadow: "5px 5px 3px black",
								"&:hover": {
									boxShadow: "0px 0px 0px transparent",
								},
							}}
						>
							{languageOptions.map((lang) => {
								return (
									<MenuItem value={lang.value} id={lang.id}>
										{lang.value}
									</MenuItem>
								);
							})}
						</Select>
					</div>
					<div className="bottom">
						<CodeEditorWindow
							language={language || "javascript"}
							onChange={actualCodeHandler}
							code={actualCode}
						/>
						<div>
							<h3>Output</h3>
							<div
								className={`output ${
									loader && "outputLoader"
								} ${compileError && "danger"}`}
							>
								{compileError}
								{!compileError &&
									compiledCode.split("\n").map((text) => {
										return <div>{text}</div>;
									})}
								{loader && (
									<CircularProgress
										size={100}
										thickness={2}
									/>
								)}
							</div>
							<div className={`customInputs`}>
								<textarea
									className="textArea"
									placeholder="Custom Inputs"
									onChange={inputChangeHandler}
								></textarea>
							</div>
							<button className="execute" onClick={compileCode}>
								Compile And Execute
							</button>
							<button className="execute">Submit</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
