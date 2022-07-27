import React from 'react'
import { useSelector } from 'react-redux'
import BlogCard from '../components/BlogCard'
import Grid from '../components/Grid'
import Helmet from '../components/Helmet'
import NavMenu from '../components/NavMenu'

const Blogs = () => {
    const blogs = useSelector(state => state.blog.blogs);
    return (
        <Helmet title='Blogs'>
            <NavMenu />
            <div className="main">
                <Grid
                    col={2}
                    mdCol={2}
                    smCol={2}
                    gap={1}
                >
                    {blogs && blogs.map((item, index) => (
                        <BlogCard key={index} item={item} />
                    ))}
                </Grid>
            </div>
        </Helmet>
    )
}

export default Blogs
