import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	teamName: null,
	teamId: null,
	isLoggedIn: false,
	isFirstTime: false,
};

const AuthSlice = createSlice({
	name: "Authentication",
	initialState: initialState,
	reducers: {
		loginHandler(state, action) {
			const { user } = action.payload;
			localStorage.setItem("teamId", user._id);
			localStorage.setItem("teamName", user.username);
			localStorage.setItem("isFirstTime", user.firstLogin);
			return {
				isLoggedIn: true,
				teamName: user.username,
				teamId: user._id,
				firstLogin: user.firstLogin,
			};
		},
		logoutHandler(state, action) {
			localStorage.removeItem("teamId");
			localStorage.removeItem("teamName");
			localStorage.removeItem("isFirstTime");
			return { ...initialState };
		},
		setState(state, action) {
			if (localStorage.getItem("teamName")) {
				const teamName = localStorage.getItem("teamName");
				const teamId = localStorage.getItem("teamId");
				const isFirstTime = localStorage.getItem("isFirstTime");
				return {
					teamName,
					teamId,
					isFirstTime,
					isLoggedIn: true,
				};
			}
			return {
				teamName: null,
				teamId: null,
				isLoggedIn: false,
				isFirstTime: false,
			};
		},
	},
});

export const authActions = AuthSlice.actions;
export const authReducers = AuthSlice.reducer;
