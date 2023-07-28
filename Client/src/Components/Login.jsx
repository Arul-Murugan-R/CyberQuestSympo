import React, { useEffect, useState } from "react";
import {
	TextField,
	FormControl,
	OutlinedInput,
	IconButton,
	InputLabel,
	InputAdornment,
	Button,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import "./Login.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/AuthStore";
import { useNavigate } from "react-router";
const backendUrl = import.meta.env.VITE_BACKEND_URL;

export default function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [showPassword, setShowPassword] = useState(false);
	const [userState, setUserState] = useState({
		teamName: "",
		password: "",
	});
	const textHandler = (event) => {
		setUserState((prevState) => {
			return { ...prevState, [event.target.name]: event.target.value };
		});
	};
	const onSubmitHandler = () => {
		console.log(userState);
	};

	const loginHandler = async (event) => {
		try {
			event.preventDefault();
			console.log(backendUrl, userState);
			const response = await axios.post(backendUrl + "/user/login", {
				username: userState.teamName,
				password: userState.password,
			});
			console.log(response.data);
			const user = response.data.user;
			dispatch(authActions.loginHandler({ user: user }));
			setUserState({
				teamName: "",
				password: "",
			});
			return navigate("/");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="login-container">
			<center>
				<h3>Login Page</h3>
			</center>
			<FormControl
				sx={{ width: "100%" }}
				variant="outlined"
				color="success"
			>
				<InputLabel htmlFor="outlined-adornment-name">
					Team Name
				</InputLabel>
				<OutlinedInput
					id="outlined-adornment-name"
					label="Team Name"
					name="teamName"
					onChange={textHandler}
					value={userState.teamName || ""}
				/>
			</FormControl>
			<FormControl
				sx={{ width: "100%" }}
				variant="outlined"
				color="success"
			>
				<InputLabel htmlFor="outlined-adornment-password">
					Password
				</InputLabel>
				<OutlinedInput
					id="outlined-adornment-password"
					type={showPassword ? "text" : "password"}
					label="Password"
					name="password"
					onChange={textHandler}
					value={userState.password || ""}
					endAdornment={
						<InputAdornment position="end">
							<IconButton
								aria-label="toggle password visibility"
								onClick={() => setShowPassword((prev) => !prev)}
								//   onMouseDown={handleMouseDownPassword}
								edge="end"
							>
								{showPassword ? (
									<VisibilityOff />
								) : (
									<Visibility />
								)}
							</IconButton>
						</InputAdornment>
					}
				/>
			</FormControl>
			<FormControl sx={{ width: "100%" }}>
				{/* sx={{boxShadow: '6px 6px 2px black'}} */}
				<Button
					variant="outlined"
					size="medium"
					type="submit"
					onClick={loginHandler}
				>
					Login
				</Button>
			</FormControl>
		</div>
	);
}
