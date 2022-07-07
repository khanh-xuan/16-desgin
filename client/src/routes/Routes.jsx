import React from 'react'
import { Route, Routes as Router } from 'react-router-dom'

import About from '../pages/About';
import Admin from '../pages/Admin';
import Blogs from '../pages/Blogs';
import BlogView from '../pages/BlogView';
import Contact from '../pages/Contact';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ProjectView from '../pages/ProjectView';

const Routes = () => {
    return (
        <Router>
            <Route path="/" element={<Home />} />
            <Route path="/:project" element={<Home />} />
            <Route path="/project/:projectSlug" element={<ProjectView />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:blogSlug" element={<BlogView />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
        </Router>
    )
}

export default Routes
