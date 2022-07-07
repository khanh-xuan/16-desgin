import { createSlice } from "@reduxjs/toolkit";
import { ACCESS_TOKEN_NAME } from "../../constants/constants"

const initialState = {
    isAuthenticated: localStorage.getItem('isAuthenticated') || false,
    accessToken: localStorage.getItem(ACCESS_TOKEN_NAME) || null,
    loggging: false,
    user: null,
}

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        login: (state, action) => {
            state.loggging = true
        },
        loginSuccess: (state, action) => {
            state.isAuthenticated = true
            state.loggging = false
            state.accessToken = action.payload.accessToken

            localStorage.setItem('isAuthenticated', true)
        },
        loginFailed: (state, action) => {
            state.isAuthenticated = false
            state.loggging = false;
        },
        logout: (state) => {
            state.isAuthenticated = false
            state.user = null
        },
        setAuth: (state, action) => {
            localStorage.setItem('isAuthenticated', true)
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated,
                user: action.payload.user
            }
        }
    }
})

//Actions 
export const loginActions = loginSlice.actions;
//Selectors
//Reducer

export default loginSlice.reducer

