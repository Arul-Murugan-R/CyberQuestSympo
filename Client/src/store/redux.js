import { configureStore } from "@reduxjs/toolkit";
import { authReducers } from "./AuthStore";
import { programReducers } from "./ProgramStore";
import { snackReducers } from "./SnackStore";

const store = configureStore({
	reducer: {
		auth: authReducers,
		programs: programReducers,
		snackbar: snackReducers,
	},
});

export default store;
