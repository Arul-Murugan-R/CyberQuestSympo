import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const ProgramSlice = createSlice({
	name: "ProgramStore",
	initialState: initialState,
	reducers: {
		saveAll(state, action) {
			const { allPrograms } = action.payload;
			console.log(allPrograms);
			return allPrograms;
		},
		updateProgram(state, action) {
			const { questionNo, userId, content, language,compilerId } = action.payload;
			const unChangedArray = state.filter(
				(item) =>
					item.userId !== userId && item.questionNo !== questionNo
			);
			return [...unChangedArray, { questionNo, userId, content,compilerId,language }];
		},
		reset(state, action) {
			return [];
		},
	},
});

export const programAction = ProgramSlice.actions;
export const programReducers = ProgramSlice.reducer;
