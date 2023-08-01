const QuestionTemplate = ({ question }) => {
	return (
		<div style={{ padding: 30 }}>
			<h3>{question.title}</h3>
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
					Sample Input : {question.sampleInput}
					<br />
					Sample Output : {question.sampleOutput}
					<br />
					<br />
					Explaination :<br />
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
				<pre style={{ color: "#ccc" }} key="#4">
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
};

export default QuestionTemplate;
