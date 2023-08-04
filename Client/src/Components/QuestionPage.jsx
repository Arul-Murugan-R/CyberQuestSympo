import React, { useState, useEffect } from "react";
import "./QuestionPage.css";
import CodeEditorWindow from "./CodeEditorWindow";
import { langOptions2, languageOptions } from "../data";
import { Select, MenuItem, CircularProgress } from "@mui/material";
import monacoThemes from "monaco-themes/themes/themelist";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { programAction } from "../store/ProgramStore";
import { snackActions } from "../store/SnackStore";
import { questionsData } from "../QuestionData";
import QuestionTemplate from "./QuestionTemplate";
import { hintActions } from "../store/HintStore";

let timer = setTimeout(() => null, 1000);
const serverUrl = import.meta.env.VITE_BACKEND_URL;

const limitArray = [1, 2, 3, 4, 5];

const options = {
	method: "POST",
	url: import.meta.env.VITE_RAPID_API_URL,
	headers: {
		"content-type": "application/json",
		"x-compile": "rapidapi",
		"Content-Type": "application/json",
		"X-RapidAPI-Key": import.meta.env.VITE_RAPID_API_KEY,
		"X-RapidAPI-Host": import.meta.env.VITE_RAPID_API_HOST,
	},
};

export default function QuestionPage() {
	const isLoggedin = useSelector((state) => state.auth.isLoggedIn);
	const userId = useSelector((state) => state.auth.teamId);
	const { id: questionNo } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [compiledCode, setCompiledCode] = useState("");
	const [loader, setLoader] = useState(false);
	const [sampleInput, setSampleInput] = useState("");
	const [compileError, setCompileError] = useState();
	const question = questionsData[questionNo - 1];
	
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
				language: "python",
				filteredCodeId: "17",
			};
		}
	};

	const [actualCode, setActualCode] = useState(() => loadCode().convert);
	const [language, setLanguage] = useState(() => loadCode().language);
	const [compilerId, setCompilerId] = useState(
		() => loadCode().filteredCodeId
	);

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

	const handleSelector = (event) => {
		const filteredLanguage = langOptions2.find(
			(lang) => lang.value == event.target.value
		);
		setLanguage(event.target.value);
		setCompilerId(filteredLanguage.compiler);
	};

	const inputChangeHandler = (event) => {
		setSampleInput(event.target.value);
	};

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
		options.data = {
			lang: language,
			code: actualCode,
			input: sampleInput.length > 0 ? sampleInput : question.sampleInput,
		};

		if (language === "c") {
			options.url = import.meta.env.VITE_C_COMPILER_URL;
			options.headers["X-RapidAPI-Host"] =
				import.meta.env.VITE_C_COMPILER_HOST;
			options.data.language = language;
		}

		try {
			const response = await axios.request(options);
			setCompiledCode(response.data.output);
			setLoader(false);
		} catch (error) {
			setCompileError(error.data.error || "Something went wrong!");
		}
		setLoader(false);
	};

	const submitCode = async () => {
		setCompiledCode("");
		setLoader(true);
		setCompileError(null);
		try {
			for (const i of limitArray) {
				const response = await axios.post(
					serverUrl + "/program/submit",
					{
						language,
						code: actualCode,
						questionNo,
						userId,
						limit: i,
					}
				);
				if (response.status === 202) {
					setLoader(false);
					return setCompiledCode(response.data.message);
				}
				if (i === 5 && response.status === 200) {
					dispatch(
						hintActions.addHint({
							hint: response.data.hint,
							questionNo: response.data.questionNo,
						})
					);
					setLoader(false);
					return setCompiledCode(response.data.message);
				}
				if (response.status === 200) continue;
				else{ 
					setLoader(false);
					return setCompileError(response.data.message);}
			}
		} catch (e) {
			dispatch(
				snackActions.open({ content: "Error occured!", type: "error" })
			);
		}

		setLoader(false);
	};

	return (
		<>
			<div className="QuestionDiv">
				<div className="QuestionContainer">
					<QuestionTemplate question={question} />
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
							{langOptions2.map((lang) => {
								return (
									<MenuItem
										value={lang.value}
										id={lang.value}
										key={lang.value}
									>
										{lang.label}
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

							<p
								style={{
									color: "whitesmoke",
									visibility: `${
										loader ? "visible" : "hidden"
									}`,
								}}
							>
								Running test cases!
							</p>

							<div
								className={`output ${
									loader && "outputLoader"
								} ${compileError && "danger"}`}
							>
								{compileError}
								{!compileError &&
									compiledCode
										.split("\n")
										.map((text, index) => {
											return (
												<div key={`t${index}`}>
													{text}
												</div>
											);
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
									onBlur={inputChangeHandler}
								></textarea>
							</div>
							<button
								className="execute"
								onClick={compileCode}
								disabled={loader}
							>
								Compile And Execute
							</button>
							<button
								className="execute"
								onClick={submitCode}
								disabled={loader}
							>
								Submit
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
