import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const HintSlice = createSlice({
	name: "HintStore",
	initialState,
	reducers: {
		setHints(state, action) {
			return action.payload.hints;
		},
		addHint(state, action) {
			return [
				...state,
				{
					hint: action.payload.hint,
					questionNo: action.payload.questionNo,
				},
			];
		},
		reset(state, action) {
			return [];
		},
	},
});

export const hintActions = HintSlice.actions;
export const hintReducers = HintSlice.reducer;
