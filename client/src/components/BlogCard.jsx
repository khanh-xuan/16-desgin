import React from 'react'
import { Link } from 'react-router-dom'

const BlogCard = (props) => {
    const date = new Date(props.item.createAt)

    return (
        <Link to={`/blog/${props.item.slug}`} className={`blog`}>
            <div className="blog__card">
                <div className="blog__card__img">
                    <img src={props.item.image} alt="" />
                </div>
                <div className="blog__card__info">
                    <div className="blog__card__info__title">{props.item.title}</div>
                    <div className="blog__card__info__date">{date.toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    <div className="blog__card__info__description" dangerouslySetInnerHTML={{ __html: props.item.description }}></div>
                </div>
            </div>
        </Link>
    )
}

export default BlogCard
