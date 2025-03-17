import { createSlice } from "@reduxjs/toolkit";
import { fetchCurrentUser } from "../action/user";
const userSlice = createSlice({
    name: "user",
    initialState: {
        userData: {},
        accessToken: null,
        isLoggedIn: false,
        isLoading: false,
        isAdmin: false,
        isError: false
    },
    reducers: {
        setAccessToken: (state, action) => {
            state.accessToken = action.payload.accessToken;
        },
        login: (state, action) => {
            console.log(action.payload)
            state.accessToken = action.payload.accessToken;
            state.isLoggedIn = true;
            state.userData = action.payload.userData
        },
        setUserData: (state, action) => {
            console.log('setUserData', action.payload)
            state.userData = action.payload.userData
        },
        logout: (state) => {
            state.accessToken = null;
            state.isLoggedIn = false;
            state.userData = {}
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCurrentUser.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchCurrentUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.isLoggedIn = true
            state.userData = action.payload
            return state
        })
        builder.addCase(fetchCurrentUser.rejected, (state) => {
            console.log('eror')
            state.isLoading = false
            state.isError = true
            state.isLoggedIn = true
            state.userData = {},
                state.accessToken = null
        })
    }
})
const userActions = userSlice.actions;
const userReducer = userSlice.reducer;
export { userReducer, userActions }