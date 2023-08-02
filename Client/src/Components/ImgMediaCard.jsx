import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router";
import "./Card.css";
import { useSelector } from "react-redux";
import { questionsData } from "../QuestionData";

function ImgMediaCard() {
	return (
		<Card sx={{ maxWidth: 400 }}>
			<CardMedia
				component="img"
				alt="green iguana"
				height="140"
				image="./sympologoc2.png"
			/>
			<CardContent>
				<Typography gutterBottom variant="h5" component="div">
					Lizard
				</Typography>
				<Typography variant="body2" color="text.secondary">
					Lizards are a widespread group of squamate reptiles, with
					over 6,000 species, ranging across all continents except
					Antarctica
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">Share</Button>
				<Button size="small">Learn More</Button>
			</CardActions>
		</Card>
	);
}

function ImgMediaCardCust() {
	const navigate = useNavigate();
	const problems = questionsData;
	return (
		<>
			<div className="container">
				<div className="services">
					{/* {Array.from(Array(6), (e, i) => {
						return (
							<div
								className={`service service${i + 1}`}
								onClick={() => {
									return navigate("/question/" + (i + 1));
								}}
								key={i}
							>
								<div className="front">
									<h4>Clue {i + 1}</h4>
								</div>
								<div className="back">
									<h3>Clue {i + 1}</h3>
									<p>
										Lorem ipsum dolor sit amet, consectetur
										adipisicing elit. Minus eaque deserunt
										ipsum consectetur assumenda ducimus
									</p>
								</div>
							</div>
						);
					})} */}
					{problems.map((problem, i) => {
						return (
							<div
								className={`service service${i + 1}`}
								onClick={() => {
									return navigate("/question/" + (i + 1));
								}}
								key={i}
							>
								<div className="front">
									<h4>Question {i + 1}</h4>
								</div>
								<div className="back">
									<h4>{problem.title}</h4>
									<p>
										{problem.description.slice(
											0,
											Math.min(
												problem.description.length,
												250
											)
										)}
										{problem.description.length < 250
											? "."
											: "..."}
									</p>
								</div>
							</div>
						);
					})}
					{/* <div className="service service2">
				<div className="front">
					<h4>Question 2</h4>

				</div>
				<div className="back">
					<h3>Question 2</h3>
					<p>Discover the Pattern</p>
				</div>
			</div>
			<div className="service service3">
				<div className="front">
					<h4>Question 3</h4>

				</div>
				<div className="back">
					<h3>Question 3</h3>
					<p>Spiral Pattern</p>
				</div>
			</div>
      <div className="service service4">
				<div className="front">
					<h4>Question 4</h4>

				</div>
				<div className="back">
					<h3>Question 4</h3>
					<p>Write a program</p>
				</div>
			</div>
      <div className="service service5">
				<div className="front">
					<h4>Question 5</h4>

				</div>
				<div className="back">
					<h3>Question 5</h3>
					<p>LeetCode Problem</p>
				</div>
			</div>
      <div className="service service6">
				<div className="front">
					<h4>Question 6</h4>

				</div>
				<div className="back">
					<h3>Question 6</h3>
					<p>Read the file and extract the data given</p>
				</div>
			</div> */}
				</div>
			</div>
		</>
	);
}

export { ImgMediaCard, ImgMediaCardCust };
