const QuestionTemplate = ({ question }) => {
	return (
		<div style={{ padding: 30 }}>
			<h2>{question.title}</h2>
			<p>
				Description: <br />
				{question.description.split(".").map((text, index) => {
					return (
						<span key={`text1${index}`}>
							{text.trim()}. <br />
						</span>
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
				<pre style={{ color: "#ccc" }}>
					Input : {question.sampleInput}
					<br />
					Output : {question.sampleOutput}
					<br />
					<br />
					<div style={{ color: "#fff" }}>Explaination :</div>
					<ul style={{ marginLeft: "1rem" }}>
						{question.explanation.split(".").map((text, index) => {
							return (
								<li key={`text${index}`}>
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
			{question.inputFormat.split(".").map((text, index) => {
					return (
						<span key={`text1${index}`}>
							{text.trim()}. <br />
						</span>
					);
				})}
			<br />
			<br />
			Output Format <br /><br />{question.outputFormat}
			Constraints
			<br />
			<br />
			{question.constrains.split(".").map((text, index) => {
				return (
					<span key={`text1${index}`}>
						• {text.trim()}. <br />
					</span>
				);
			})}
			{/* {`1 <= s.length <= 104`}
			<br />
			{`1 <= words.length <= 5000`}
			<br />
			{`1 <= words[i].length <= 30`}
			<br />
			{`s and words[i] consist of lowercase English letters.`} */}
			<br />
			<br />
			Sample Input 1<br />
			<div style={{ background: "#343434", padding: 10 }}>
				<pre style={{ color: "#ccc" }} key="#4">
					{question.sampleInput.split(".").map((text, index) => {
						return (
							<span key={`text1${index}`}>
								{text.trim()} <br />
							</span>
						);
					})}
				</pre>
			</div>
			<br />
			Sample Output 1<br />
			<div style={{ background: "#343434", padding: 10 }}>
				<pre style={{ color: "#ccc" }} key="#4">
					{question.sampleOutput.split(".").map((text, index) => {
						return (
							<span key={`text1${index}`}>
								{text.trim()} <br />
							</span>
						);
					})}
				</pre>
			</div>
			<br />
			{/* Explanation 0<br />
			<br />
			There are shelves and requests, or queries.
			<br />
			- 1 Place a page book at the end of shelf .<br />
			- 2 Place a page book at the end of shelf .<br />
			- 3 Place a page book at the end of shelf .<br />
			- 4 The number of pages in the book on the shelf is 78.
			<br />
			- 5 The number of books on the shelf is 2.
			<br /> */}
		</div>
	);
};

export default QuestionTemplate;
