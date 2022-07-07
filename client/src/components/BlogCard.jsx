import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = (props) => {
    return (
        <Link to={`/blog/${props.item.slug}`} className={`blog`}>
            <div className="blog__card">
                <div className="blog__card__img">
                    <img src={props.item.image} alt="" />
                </div>
                <div className="blog__card__info">
                    <div className="blog__card__info__title">{props.item.title}</div>
                    <div className="blog__card__info__date">{props.item.date}</div>
                    <div className="blog__card__info__description">{props.item.description}</div>
                </div>
            </div>
        </Link>
    )
}

export default BlogCard
