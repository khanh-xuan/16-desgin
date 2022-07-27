import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { API_URL } from '../constants/constants';
import Grid from './Grid';


const Gallerry = () => {
    const { projectSlug } = useParams()
    const [albums, setAlbums] = useState(null)
    const [model, setModel] = useState(false)
    const [img, setImg] = useState('')
    const [imgIndex, setImgIndex] = useState(0)

    const getImage = (imgSrc, index) => {
        setModel(true)
        setImg(imgSrc)
        setImgIndex(index)
    }

    const handleButton = (type) => {
        if (type === 'pre') {
            if (imgIndex > 0) {
                setImgIndex(preIndex => preIndex - 1);
                setImg(albums.images[imgIndex - 1])
            }
        } else {
            if (imgIndex < albums.images.length - 1) {
                setImgIndex(preIndex => preIndex + 1);
                setImg(albums.images[imgIndex + 1])
            }
        }
    }

    const hiddenModel = (e) => {
        if (e.keyCode === 27 && model) {
            setModel(false);
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', hiddenModel)

        return () => {
            document.removeEventListener('keydown', hiddenModel)
        }
    })

    useEffect(() => {
        const a = document.querySelector('.image-modal__albums__item.active')
        if (a) {
            a.scrollIntoView({
                behavior: 'auto',
                block: 'center',
                inline: 'center'
            });
        }
    })

    useEffect(() => {
        const getAlbums = async () => {
            const res = await axios.get(`${API_URL}/images/${projectSlug}`);

            if (res.data.success) {
                setAlbums(res.data.images)
            }
        }
        getAlbums()
    }, [projectSlug])

    return (
        <div className="gallery">
            <div className={`image-modal ${model ? 'active' : ''}`}>
                <div className="image-modal__close" onClick={() => setModel(false)}>
                    <i className='bx bx-x'></i>
                </div>
                <div className="image-modal__img">
                    <div className="image-modal__img__btn" onClick={() => handleButton('pre')}>
                        <i className='bx bx-chevron-left' ></i>
                    </div>
                    <img src={img} alt="" className="img-view" />
                    <div className="image-modal__img__btn" onClick={() => handleButton('next')}>
                        <i className='bx bx-chevron-right' ></i>
                    </div>
                </div>
                <div className="image-modal__albums">
                    {albums && albums.images.map((item, index) => (
                        <div className={`image-modal__albums__item ${imgIndex === index ? 'active' : ''}`} key={index} onClick={() => getImage(item, index)}>
                            <img alt="" src={item} />
                        </div>
                    ))}
                </div>
            </div>
            <Grid
                col={3}
                mdCol={2}
                smCol={2}
                gap={1}
            >
                {albums && albums.images.map((item, index) => (
                    <div className="gallery__img" key={index} onClick={() => getImage(item, index)}>
                        <img alt="" src={item} />
                    </div>
                ))}
            </Grid>
        </div>
    )
}

export default Gallerry
