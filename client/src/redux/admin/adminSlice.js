import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    show: null,
    edit: null
}

const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        setShow: (state, action) => {
            state.show = action.payload
        },
        setEdit: (state, action) => {
            state.edit = action.payload
        },
    }
})

export const AdminActions = adminSlice.actions;

export default adminSlice.reducer