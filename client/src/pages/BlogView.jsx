import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import BlogCard from '../components/BlogCard'
import Grid from '../components/Grid'
import Helmet from '../components/Helmet'
import NavMenu from '../components/NavMenu'

const BlogView = () => {
    const blogs = useSelector(state => state.blog.blogs);

    const { blogSlug } = useParams();

    const getBlogBySlug = blogs && blogs.find(b => b.slug === blogSlug);

    const date = blogs && new Date(getBlogBySlug.createAt)

    const recent = () => {
        if (blogs) {
            const recentBlog = blogs.filter(b => b.slug !== blogSlug)

            const randomIndex = Math.floor(Math.random() * recentBlog.length - 1)

            const a = [...recentBlog];

            return a.splice(randomIndex < 0 ? randomIndex + 1 : randomIndex, 2)
        }
    }

    useEffect(() => {
        const ele = document.querySelector('.blog-content')
        if (ele) {
            ele.scrollIntoView({
                behavior: 'smooth'
            });
        }
        // ele.scrollTo(0, 0);
    }, [blogSlug])


    return (
        blogs && <Helmet title='Blog-Detail'>
            <NavMenu mobile={true} />
            <div className="blog-des">
                <div className="blog-des__title">
                    <h2>{getBlogBySlug.title}</h2>
                    <h3>Hai Phong, {date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}.</h3>
                </div>
                <div className="blog-des__image">
                    <img src={getBlogBySlug.image} alt="" />
                </div>
            </div>
            <div className="main">
                <div className="blog-content">
                    <Link to="/blogs">
                        <div className="blog-content__close">
                            <span>back</span>
                            <i className='bx bx-x' ></i>
                        </div>
                    </Link>
                    <div className="blog-content__title">
                        <h2>{getBlogBySlug.title}</h2>
                        <h3>Hai Phong, {date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}.</h3>
                        <img src={getBlogBySlug.image} alt="" />
                    </div>
                    <div className="blog-content__info" dangerouslySetInnerHTML={{ __html: getBlogBySlug.description }}>
                    </div>
                    <div className="blog-content__social">
                        <span>Follow us on</span>
                        <a target="_blank" rel="noopener noreferrer" href="https://facebook.com" className="nav-menu__social__fb">
                            <i className='bx bxl-facebook'></i>
                        </a>
                        <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/" className="nav-menu__social__ins">
                            <i className='bx bxl-instagram' ></i>
                        </a>
                    </div>
                </div>
                <div className="blog-recent">
                    <Grid
                        col={2}
                        mdCol={2}
                        smCol={2}
                        gap={1}
                    >
                        {blogs && recent().map((item, index) => (
                            <BlogCard key={index} item={item} />
                        ))}
                    </Grid>
                </div>
            </div>
        </Helmet>
    )
}

export default BlogView
