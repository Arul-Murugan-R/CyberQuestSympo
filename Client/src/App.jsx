import "./App.css";
import DrawerAppBar from "./Components/DrawerAppBar";
import { ImgMediaCardCust } from "./Components/ImgMediaCard";

import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import QuestionPage from "./Components/QuestionPage";
import Login from "./Components/Login";
import { authActions } from "./store/AuthStore";
import { useDispatch, useSelector } from "react-redux";
import CustomSnackbar from "./Components/UI/CustomSnackBar";
import axios from "axios";
import { programAction } from "./store/ProgramStore";
import { hintActions } from "./store/HintStore";
import { useEffect } from "react";
import { snackActions } from "./store/SnackStore";
import PageNotFound from "./Components/404";
import store from "./store/redux";

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<>
				<DrawerAppBar />
				<Outlet />
				<CustomSnackbar />
			</>
		),
		errorElement: <PageNotFound />,
		children: [
			{
				index: true,
				element: (
					<>
						<div className="homeCardContainer">
							<ImgMediaCardCust />
						</div>
					</>
				),
			},
			{
				path: "question/:id",
				element: (
					<>
						<QuestionPage />
					</>
				),
			},
			{
				path: "login",
				element: <Login />,
			},
		],
	},
	{
		path: "*",
		element: <PageNotFound />,
	},
]);

let initial = true;
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		window.addEventListener("blur", () => {
			if (store.getState().auth.isLoggedIn) {
				dispatch(authActions.logoutHandler());
				dispatch(programAction.reset());
				dispatch(hintActions.reset());
				dispatch(
					snackActions.open({
						content: "Logged out due to switching windows!",
						type: "error",
					})
				);
			}
		});
	}, []);
	const getprogs = async (userId) => {
		const result = await axios.post(backendUrl + "/program/getall", {
			userId,
		});
		if (result.status === 200)
			dispatch(
				programAction.saveAll({ allPrograms: result.data.programs })
			);
	};

	const getHintsFound = async (userId) => {
		try {
			const result = await axios.post(backendUrl + "/user/gethints", {
				userId,
			});
			if (result.status === 200)
				dispatch(hintActions.setHints({ hints: result.data.hints }));
		} catch (e) {
			console.log(e);
		}
	};

	if (initial) {
		dispatch(authActions.setState());
		const userId = store.getState().auth.teamId;
		getprogs(userId);
		getHintsFound(userId);

		initial = false;
	}

	return <RouterProvider router={router} />;
}

export default App;
