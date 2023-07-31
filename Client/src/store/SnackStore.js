import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	visible: false,
	content: null,
	type: null,
};

const SnackSlice = createSlice({
	name: "SnackStore",
	initialState,
	reducers: {
		open(state, action) {
			const { content, type } = action.payload;
			return {
				visible: true,
				content,
				type,
			};
		},
		close(state, action) {
			return {
				visible: false,
				content: "None",
				type: "success",
			};
		},
	},
});

export const snackActions = SnackSlice.actions;
export const snackReducers = SnackSlice.reducer;
