import React from 'react'
import { Link } from 'react-router-dom'

const PhotoCard = (props) => {
    return (
        <Link to={`/project/${props.item.slug}`} className="link__photo">
            <div
                className="photo__card"
            >
                <div className="photo__card__img">
                    <img src={props.item.image} alt="" />
                </div>
                <div className="photo__card__info">
                    <div className="photo__card__info__name">{props.item.title}</div>
                    <div className="photo__card__info__year">{props.item.year}</div>
                    <div className="photo__card__info__add">{props.item.add}</div>
                </div>
            </div>
        </Link>
    )
}

export default PhotoCard
