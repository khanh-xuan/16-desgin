import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false
}

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        setLoading: (state, action) => {
            state.loading = true
        },
        loadingSuccess: (state, action) => {
            state.loading = false
        }
    }
})


export const LoadingActions = loadingSlice.actions

export default loadingSlice.reducer