import React,{useState,useRef, useEffect} from 'react'
import './QuestionPage.css'
import CodeEditorWindow from './CodeEditorWindow'
import { languageOptions } from '../data'
import { Select,MenuItem,CircularProgress } from '@mui/material'
import monacoThemes from "monaco-themes/themes/themelist";
import axios from 'axios'


export default function QuestionPage() {
  const [language,setLanguage] = useState("javascript")
  const [compilerId,setCompilerId] = useState('17')
  const [compiledCode, setCompiledCode] = useState('');
  const [actualCode,setActualCode] = useState('')
  const [loader,setLoader] = useState(false)

  // const [theme,setTheme] = useState("Cobalt")
  const handleSelector = async (event) =>{
    const filteredLanguage = await languageOptions.find((lang)=>lang.value==event.target.value)
    // console.log(filteredLanguage)
    setLanguage(event.target.value)
    setCompilerId(filteredLanguage.compiler)
  }
  // const themeChangeHandler = (event) =>{
  //   console.log(event.target.value)
  //   setTheme(event.target.value)
  // }

  const actualCodeHandler = (value)=>{
    setActualCode(value)
  }
  const compileCode = async (sourceCode) => {
    setCompiledCode('')
    setLoader(true)
    const url = import.meta.env.VITE_RAPID_API_URL ;
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': import.meta.env.VITE_RAPID_API_HOST
      },
      body: new URLSearchParams({
        LanguageChoice: compilerId+''||'5',
        Program: actualCode|| 'print("Hello World!, on python language")'
      })
    };
    // console.log(compilerId,actualCode)
    
    try {
      const response = await fetch(url, options);
      console.log(response)
      const result = await response.json();
      console.log(result);
      setCompiledCode(result.Result)
      setLoader(false)
    } catch (error) {
      console.error(error);
      setLoader(false)
    }
  };

  return (
    <>
    
    <div className='QuestionDiv'>
      <div className="QuestionContainer">
            {sampleTempleForQuestion}
      </div>
      <div  className="codeContainer">
      <div className="top">
      <Select
          value={language}
          displayEmpty
          onChange={handleSelector}
          sx={{
            width:'150px',color:'black',height:'40px',background:'#fff',margin:'10px 0px',outline:'none',
            boxShadow:'5px 5px 3px black',
            "&:hover":{
              boxShadow:'0px 0px 0px transparent'
            }
          }}
        >
          {languageOptions.map((lang)=>{
          return <MenuItem value={lang.value} id={lang.id} >
            {lang.value}
          </MenuItem>
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
      <CodeEditorWindow language={language||"javascript"} onChange={actualCodeHandler}/>
        <div >
        <h3>Output</h3>
          <div className={`output ${loader&&'outputLoader'}`}>
            {(compiledCode)}{loader&&<CircularProgress size={100} thickness={2}  />}
          </div>
          <div className={`customInputs`}>
            <textarea className='textArea' placeholder='Custom Inputs'></textarea>
          </div>
          <button className='execute' onClick={compileCode}  >Compile And Execute</button>
        </div>
      </div>
      </div>
    </div>
    </>
  )
}

const sampleTempleForQuestion = (
  <div style={{padding:30}}>
            Snow Howler is the librarian at the central library of the city of HuskyLand. He must handle requests which come in the following forms:
<br/>
1 x y : Insert a book with  pages at the end of the  shelf.
<br/>
2 x y : Print the number of pages in the  book on the  shelf.
<br/>
3 x : Print the number of books on the  shelf.
<br/>
Snow Howler has got an assistant, Oshie, provided by the Department of Education. Although inexperienced, Oshie can handle all of the queries of types 2 and 3.
<br/>
Help Snow Howler deal with all the queries of type 1.
<br/>
Oshie has used two arrays:<br/>
<div style={{background:'#343434',padding:10,}}>
    <pre style={{color:'#ccc'}}>
    int* total_number_of_books;<br/>
/*<br/>
 * This stores the total number of books on each shelf.<br/>
 */<br/>
<br/>
int** total_number_of_pages;<br/>
/*<br/>
 * This stores the total number of pages in each book of each shelf.<br/>
 * The rows represent the shelves and the columns represent the books.<br/>
 */<br/>
    </pre>
</div>
Input Format<br/>
<br/>
The first line contains an integer , the number of shelves in the library.<br/>
The second line contains an integer , the number of requests.<br/>
Each of the following  lines contains a request in one of the three specified formats.<br/>
<br/>
Constraints<br/>
<br/>
For each query of the second type, it is guaranteed that a book is present on the  shelf at  index.<br/>
Both the shelves and the books are numbered starting from 0.<br/>
Maximum number of books per shelf .<br/>
Output Format<br/>
<br/>
Write the logic for the requests of type 1. The logic for requests of types 2 and 3 are provided.<br/>
<br/>
Sample Input 0<br/>
<div style={{background:'#343434',padding:10,}}>
    <pre style={{color:'#ccc'}}>
    5<br/>
5<br/>
1 0 1<br/>
1 0 2<br/>
1 2 7<br/>
2 2 0<br/>
3 0<br/>
    </pre>
</div>
Explanation 0<br/>
<br/>
There are  shelves and  requests, or queries.<br/>
- 1 Place a  page book at the end of shelf .<br/>
- 2 Place a  page book at the end of shelf .<br/>
- 3 Place a  page book at the end of shelf .<br/>
- 4 The number of pages in the  book on the  shelf is 78.<br/>
- 5 The number of books on the  shelf is 2.<br/>
        </div>
)
