import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Header from './Header'
import Routes from '../routes/Routes'
import Loading from './Loading'

import { useDispatch } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../constants/constants';
import { projectAction } from '../redux/project/projectSlice'
import { LoadingActions } from '../redux/loading/loadingSlice'
import { blogAction } from '../redux/blog/blogSlice'


const Layout = () => {

    const dispatch = useDispatch();

    //get Projects
    useEffect(() => {
        const getProjects = async () => {
            dispatch(LoadingActions.setLoading())
            const res = await axios.get(`${API_URL}/project`);
            if (res.data.success) {
                dispatch(projectAction.getProjectsSuccess(res.data.projects))
                dispatch(LoadingActions.loadingSuccess())
            }
        }

        getProjects()
    }, [dispatch])

    //get Blogs
    useEffect(() => {
        const getBlogs = async () => {
            dispatch(LoadingActions.setLoading())
            const res = await axios.get(`${API_URL}/blog`);
            if (res.data.success) {
                dispatch(blogAction.getBlogsSuccess(res.data.blogs))
                dispatch(LoadingActions.loadingSuccess())
            }
        }

        getBlogs()
    }, [dispatch])

    return (
        <BrowserRouter>
            <div className="layout">
                <Header />
                <div className="container">
                    {/* <NavMenu /> */}
                    <Routes />
                    {/* <div className="main">
                    </div> */}
                </div>
                <Loading />
            </div>
        </BrowserRouter>
    )
}

export default Layout
