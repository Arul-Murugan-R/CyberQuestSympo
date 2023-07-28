import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    teamName:null,
    teamId : null,
    isLoggedIn:false,
    isFirstTime:false,
}

const AuthSlice = createSlice({
    name:'Authentication',
    initialState:initialState,
    reducers:{
        loginHandler(state,action){
            const { user } = action.payload;
			localStorage.setItem("teamId", user.userId);
            localStorage.setItem("teamName", user.name);
			// localStorage.setItem("isFirstTime", user.firstLogin);
			return { ...user, isLoggedIn: true };
        },
        logoutHandler(state, action) {
			localStorage.removeItem("teamId");
			localStorage.removeItem("teamName");
			return { ...initialState };
		},
    }
})


export const authActions = AuthSlice.actions;
export const authReducers = AuthSlice.reducer;