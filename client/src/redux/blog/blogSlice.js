import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    blogs: null
}

const blogSlice = createSlice({
    name: 'blog',
    initialState,
    reducers: {
        getBlogsSuccess: (state, action) => {
            state.blogs = action.payload
        },
        addBlog: (state, action) => {
            state.blogs = [...state.blogs, action.payload]
        },
        updateBlog: (state, action) => {
            const updateBlog = action.payload;
            const checkBlog = state.blogs.findIndex(p => p._id === updateBlog._id)

            if (checkBlog > -1) {
                state.blogs[checkBlog] = updateBlog
            }
        },
        deleteBlog: (state, action) => {
            const blogId = action.payload;

            state.blogs = state.blogs.filter(p => p._id !== blogId)
        }
    }
})

export const blogAction = blogSlice.actions

export default blogSlice.reducer
