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
]);

let initial = true;
const backendUrl = import.meta.env.VITE_BACKEND_URL;

function App() {
	const dispatch = useDispatch();

	const getprogs = async (userId) => {
		const result = await axios.post(backendUrl + "/program/getall", {
			userId,
		});
		if (result.status === 200)
			dispatch(
				programAction.saveAll({ allPrograms: result.data.programs })
			);
	};

	if (initial) {
		dispatch(authActions.setState());
		const userId = useSelector((state) => state.auth.teamId);
		getprogs(userId);

		initial = false;
	}

	return <RouterProvider router={router} />;
}

export default App;
