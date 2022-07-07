import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    projects: null
}

const projectSlice = createSlice({
    name: 'project',
    initialState,
    reducers: {
        getProjectsSuccess: (state, action) => {
            state.projects = action.payload
        },
        addProject: (state, action) => {
            state.projects = [...state.projects, action.payload]
        },
        updateProject: (state, action) => {
            const updateProject = action.payload;
            const checkProject = state.projects.findIndex(p => p._id === updateProject._id)

            if (checkProject > -1) {
                state.projects[checkProject] = updateProject
            }
        },
        deleteProject: (state, action) => {
            const projectId = action.payload;

            state.projects = state.projects.filter(p => p._id !== projectId)
        }
    }
})

export const projectAction = projectSlice.actions

export default projectSlice.reducer
