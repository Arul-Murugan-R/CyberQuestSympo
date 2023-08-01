import React, { useState, useRef, useEffect } from "react";
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

let timer = setTimeout(() => null, 1000);

export default function QuestionPage() {
	const isLoggedin = useSelector((state) => state.auth.isLoggedIn);
	const userId = useSelector((state) => state.auth.teamId);
	const { id: questionNo } = useParams();
	const dispatch = useDispatch()
	const navigate = useNavigate();
	useEffect(()=>{
		if(questionNo<0||questionNo>6)
		{	
			dispatch(snackActions.open({
				content:'Question Comprises of 1-6',
				type:'error'
			}))
			navigate('/')
		}
	},[])
	const programs = useSelector((state) => state.programs);
	const loadCode = ()=>{
		let convert
		const result = programs.find(
			(program) => program.questionNo === questionNo
		);
		if (result) {
			// console.log(result.content);
		 convert = JSON.parse(result.content)
		 let language = result.language
		 let filteredCodeId = result.compilerId
		 return {convert,language,filteredCodeId}
		}else{
			return {convert:"",language:"javascript",filteredCodeId:"17"}
		}

	}
	const {convert,language:languageInitial,filteredCodeId} = loadCode()
	const [actualCode, setActualCode] = useState(convert);
	const [language, setLanguage] = useState(languageInitial);
	const [compilerId, setCompilerId] = useState(filteredCodeId);
	useEffect(() => {
		if (!isLoggedin) {
			return navigate("/login");
		}
	}, [isLoggedin, programs]);
	useEffect(()=>{
		const {convert,language,filteredCodeId} = loadCode()
		setActualCode(convert)
		setLanguage(language)
		setCompilerId(filteredCodeId)
	},[programs])

	const [compiledCode, setCompiledCode] = useState("");
	const [loader, setLoader] = useState(false);
	const [sampleInput,setSampleInput] = useState('')
	const [compileError, setCompileError] = useState();

	// const [theme,setTheme] = useState("Cobalt")
	const handleSelector = async (event) => {
		const filteredLanguage = await languageOptions.find(
			(lang) => lang.value == event.target.value
		);
		// console.log(filteredLanguage)
		setLanguage(event.target.value);
		setCompilerId(filteredLanguage.compiler);
	};
	const inputChangeHandler = (event)=>{
		setSampleInput(event.target.value)
	}
	// const themeChangeHandler = (event) =>{
	//   console.log(event.target.value)
	//   setTheme(event.target.value)
	// }

	const backendSaver = async (value)=>{
		const result = await axios.post(
			import.meta.env.VITE_BACKEND_URL + "/program/save",
			{
				userId,
				questionNo,
				content: JSON.stringify(value),
				language,
				compilerId
			}
		);
			if(result.status == 201){
				console.log(result.data.program)
			dispatch(programAction.updateProgram(result.data.program))
			dispatch(snackActions.open({
				content:'Code Saved Successfully!',
				type:'success'
			}))
		}
	}

	const actualCodeHandler = (value) => {
		setActualCode(value);

		clearTimeout(timer);
		timer = setTimeout(async () => {
			// console.log(userId, questionNo);
			backendSaver(value)
			// console.log(result.data);
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
				Program:
					actualCode || 'print("Hello World!, on python language")',
				Input:sampleInput.split(',')
			}),
		};
		// console.log(compilerId,actualCode)

		try {
			const response = await fetch(url, options);
			// console.log(response);
			const result = await response.json();
			console.log(result);
			if (result.Errors) {
				console.log(result.Errors);
				throw new Response(result.Errors);
			}
			setCompiledCode(result.Result);
			setLoader(false);
		} catch (error) {
			setCompileError(`Something went wrong\n`);
			setLoader(false);
		}
	};

	return (
		<>
			<div className="QuestionDiv">
				<div className="QuestionContainer">
					{sampleTempleForQuestion}
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
						{/* <Select
          displayEmpty
          value={theme}
          sx={{width:'200px',color:'black',background:'#fff',margin:'10px 0px',outline:'none'}}
          onChange={themeChangeHandler}
        >
          {Object.entries(monacoThemes).map(([themeId, themeName])=>{
           return <MenuItem value={themeName} id={themeId}>{themeName}</MenuItem>
          })}
        </Select> */}
					</div>
					<div className="bottom">
						<CodeEditorWindow
							language={language || "javascript"}
							onChange={actualCodeHandler}
							code={actualCode}
							// initialFetch={loadCode}
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

const sampleTempleForQuestion = (
	<div style={{ padding: 30 }}>
		Lorem ipsum, dolor sit amet consectetur adipisicing elit.
		 Cumque, nemo quidem libero repellendus accusamus soluta? 
		 Maiores delectus natus perferendis neque? Temporibus nesciunt odio molestiae dicta
		  dolorem debitis dolore. Sed, iure.
		<div style={{ background: "#343434", padding: 15 ,margin:'20px 0px' }}>
			Example :<br/>
			<pre style={{ color: "#ccc" }}>
				Sample Input : CARROT<br/>
				Sample Output : CAR<br/><br/>
				Explaination  :<br/> Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
				<br/>Veniam aspernatur unde nisi quos, nulla odio quod in cum magni velit 
				<br/>quae deleniti eum consectetur quo debitis! Voluptatum reprehenderit accusantium aut!<br/>
				Quis ratione qui iste explicabo eveniet quisquam voluptatem rem sint quas velit unde necessitatibus id,
				<br/> minus est quia delectus vero quam voluptate distinctio repellat ut deserunt corrupti! Unde, eligendi doloribus.

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
		{`1 <= s.length <= 104`}<br/>
		{`1 <= words.length <= 5000`}<br/>
		{`1 <= words[i].length <= 30`}<br/>
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
