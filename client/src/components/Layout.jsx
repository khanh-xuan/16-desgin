import React, { useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Header from './Header'
import Routes from '../routes/Routes'
import Loading from './Loading'

import { useDispatch } from 'react-redux';
import axios from 'axios';
import { API_URL } from '../constants/constants';
import { projectAction } from '../redux/project/projectSlice'


const Layout = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        const getProjects = async () => {
            const res = await axios.get(`${API_URL}/project`);
            if (res.data.success) {
                dispatch(projectAction.getProjectsSuccess(res.data.projects))
            }
        }

        getProjects()
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
