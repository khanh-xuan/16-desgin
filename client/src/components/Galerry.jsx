import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { API_URL } from '../constants/constants';
import Grid from './Grid';

// let albums = [
//     {
//         title: 'Pangorin',
//         year: '2019',
//         add: 'Da Nang',
//         image: 'https://uploads-ssl.webflow.com/5f74397229df985194910095/5f7f414f182dfe795150575b_Pangorin__0005_Layer%20222.jpg',
//         project: 'archi'
//     },
//     {
//         title: 'Secret Garden Hostel',
//         year: '2019',
//         add: 'Da Nang',
//         image: 'https://uploads-ssl.webflow.com/5f74397229df985194910095/5fc905b4ab9bbb141802d326_Secret%20Garden%20hostel%20web%2001.jpg',
//         project: 'inter'
//     },
//     {
//         title: 'TPH',
//         year: '2019',
//         add: 'Sai Gon',
//         image: 'https://uploads-ssl.webflow.com/5f74397229df985194910095/5fd0b286e74b734656fdaf34_TPH%20web%2001.jpg',
//         project: 'reno'
//     },
//     {
//         title: 'Wayfarer',
//         year: '2016',
//         add: 'Da Lat',
//         image: 'https://uploads-ssl.webflow.com/5f74397229df985194910095/5f7f43230d29eadd1b0992f8_Wayfarer__0006_Layer%20185.jpg',
//         project: 'archi'
//     },
//     {
//         title: 'Dream.mo',
//         year: '2021',
//         add: 'Sai Gon',
//         image: 'https://uploads-ssl.webflow.com/5f74397229df985194910095/610bde669051fa361638513a_dreammo%202021%20web%2001.jpg',
//         project: 'reno'
//     },
//     {
//         title: 'BTR',
//         year: '2020',
//         add: 'Ben Tre',
//         image: 'https://uploads-ssl.webflow.com/5f74397229df985194910095/611a3a216a8d3849c35a681e_BTR3%202020%20part2%20web%2064.jpg',
//         project: 'archi'
//     },
//     {
//         title: 'BKH',
//         year: '2020',
//         add: 'Da Nang',
//         image: 'https://uploads-ssl.webflow.com/5f74397229df985194910095/5fd0b6975f72b1759cf1f4d4_BKH%20web%2001.jpg',
//         project: 'inter'
//     },
//     {
//         title: 'Luffy cafe',
//         year: '2020',
//         add: 'Uong Bi',
//         image: 'https://uploads-ssl.webflow.com/5f74397229df985194910095/5fe5980e6b03a39d97c0305f_UBH%202020%20web%2005.jpg',
//         project: 'reno'
//     },
//     {
//         title: 'Drobe Box',
//         year: '2020',
//         add: 'Sai Gon',
//         image: 'https://uploads-ssl.webflow.com/5f74397229df985194910095/616d2fd8f3ab4309a5083fe8_1.jpg',
//         project: 'inter'
//     },
//     {
//         title: 'DTH',
//         year: '2019',
//         add: 'Duc Trong',
//         image: 'https://uploads-ssl.webflow.com/5f74397229df985194910095/5fbe54e0bc57893c39ee0115_DTH%20web%201.jpg',
//         project: 'archi'
//     },
//     {
//         title: 'Pangorin',
//         year: '2019',
//         add: 'Da Nang',
//         image: 'https://uploads-ssl.webflow.com/5f74397229df985194910095/5f7f414f182dfe795150575b_Pangorin__0005_Layer%20222.jpg',
//         project: 'reno'
//     },
//     {
//         title: 'Secret Garden Hostel',
//         year: '2019',
//         add: 'Da Nang',
//         image: 'https://uploads-ssl.webflow.com/5f74397229df985194910095/5fc905b4ab9bbb141802d326_Secret%20Garden%20hostel%20web%2001.jpg',
//         project: 'archi'
//     },
//     {
//         title: 'TPH',
//         year: '2019',
//         add: 'Sai Gon',
//         image: 'https://uploads-ssl.webflow.com/5f74397229df985194910095/5fd0b286e74b734656fdaf34_TPH%20web%2001.jpg',
//         project: 'reno'
//     },
//     {
//         title: 'Wayfarer',
//         year: '2016',
//         add: 'Da Lat',
//         image: 'https://uploads-ssl.webflow.com/5f74397229df985194910095/5f7f43230d29eadd1b0992f8_Wayfarer__0006_Layer%20185.jpg',
//         project: 'inter'
//     },
//     {
//         title: 'BKH',
//         year: '2020',
//         add: 'Da Nang',
//         image: 'https://uploads-ssl.webflow.com/5f74397229df985194910095/5fd0b6975f72b1759cf1f4d4_BKH%20web%2001.jpg',
//         project: 'inter'
//     },
//     {
//         title: 'Luffy cafe',
//         year: '2020',
//         add: 'Uong Bi',
//         image: 'https://uploads-ssl.webflow.com/5f74397229df985194910095/5fe5980e6b03a39d97c0305f_UBH%202020%20web%2005.jpg',
//         project: 'reno'
//     },
//     {
//         title: 'Drobe Box',
//         year: '2020',
//         add: 'Sai Gon',
//         image: 'https://uploads-ssl.webflow.com/5f74397229df985194910095/616d2fd8f3ab4309a5083fe8_1.jpg',
//         project: 'inter'
//     },
//     {
//         title: 'DTH',
//         year: '2019',
//         add: 'Duc Trong',
//         image: 'https://uploads-ssl.webflow.com/5f74397229df985194910095/5fbe54e0bc57893c39ee0115_DTH%20web%201.jpg',
//         project: 'archi'
//     },
//     {
//         title: 'Pangorin',
//         year: '2019',
//         add: 'Da Nang',
//         image: 'https://uploads-ssl.webflow.com/5f74397229df985194910095/5f7f414f182dfe795150575b_Pangorin__0005_Layer%20222.jpg',
//         project: 'reno'
//     },
//     {
//         title: 'Secret Garden Hostel',
//         year: '2019',
//         add: 'Da Nang',
//         image: 'https://uploads-ssl.webflow.com/5f74397229df985194910095/5fc905b4ab9bbb141802d326_Secret%20Garden%20hostel%20web%2001.jpg',
//         project: 'archi'
//     },
//     {
//         title: 'TPH',
//         year: '2019',
//         add: 'Sai Gon',
//         image: 'https://uploads-ssl.webflow.com/5f74397229df985194910095/5fd0b286e74b734656fdaf34_TPH%20web%2001.jpg',
//         project: 'reno'
//     },
//     {
//         title: 'Wayfarer',
//         year: '2016',
//         add: 'Da Lat',
//         image: 'https://uploads-ssl.webflow.com/5f74397229df985194910095/5f7f43230d29eadd1b0992f8_Wayfarer__0006_Layer%20185.jpg',
//         project: 'inter'
//     },
// ];

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
