import { configureStore } from "@reduxjs/toolkit";
import { authReducers } from "./AuthStore";
import { programReducers } from "./ProgramStore";
import { snackReducers } from "./SnackStore";
import { hintReducers } from "./HintStore";

const store = configureStore({
	reducer: {
		auth: authReducers,
		programs: programReducers,
		snackbar: snackReducers,
		hints: hintReducers,
	},
});

export default store;
