import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import Gallerry from '../components/Galerry';
import Helmet from '../components/Helmet'
import NavMenu from '../components/NavMenu'
import { useSelector } from 'react-redux';


const ProjectView = () => {
    const [showContent, setShowContent] = useState(false);

    const project = useSelector(state => state.project.projects)

    const { projectSlug } = useParams();

    const getProjectBySlug = project && project.find(x => x.slug === projectSlug)

    return (
        getProjectBySlug && <Helmet title='projects'>
            <NavMenu mobile={true} />
            <div className="project-des">
                <div className="project-des__title">
                    <h3>{getProjectBySlug.title}</h3>
                    <span>{getProjectBySlug.year} - {getProjectBySlug.add}</span>
                </div>
                <div className="project-des__content">
                    <div className="project-des__content__toggle">
                        <span>Tiếng Việt</span>
                        <i className='bx bx-chevron-right' ></i>
                    </div>
                    <div className="project-des__content__description">
                        <p><i className='bx bxs-circle'></i><strong>Diện tích khu đất: </strong>{getProjectBySlug.area} m2</p>
                        <p><i className='bx bxs-circle'></i><strong>Năm: </strong>{getProjectBySlug.year}</p>
                        <p><i className='bx bxs-circle'></i><strong>Loại hình dự án: </strong>
                            {getProjectBySlug.type === 'archi' && 'Kiến trúc'}
                            {getProjectBySlug.type === 'inter' && 'Nội thất'}
                            {getProjectBySlug.type === 'land' && 'Cảnh quan'}
                        </p>
                        <div className="project-des__content__description__content" dangerouslySetInnerHTML={{ __html: getProjectBySlug.description }}>
                        </div>
                    </div>
                </div>
                <div className="project-des__social">
                    <a target="_blank" rel="noopener noreferrer" href="https://facebook.com" className="nav-menu__social__fb">
                        <i className='bx bxl-facebook'></i>
                    </a>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/" className="nav-menu__social__ins">
                        <i className='bx bxl-instagram' ></i>
                    </a>
                </div>
            </div>
            <div className="main">
                <div className="project-des__mobile" >
                    <div className={`project-des__mobile__back ${showContent ? 'active' : ''}`} onClick={() => setShowContent(false)}>
                        <i className='bx bx-x' ></i>
                    </div>
                    <div className="project-des__mobile__title">
                        <h3>{getProjectBySlug.title}</h3>
                        <span>{getProjectBySlug.year} - {getProjectBySlug.add} </span>
                    </div>
                    <div className={`project-des__mobile__show ${showContent ? 'remove' : ''}`} onClick={() => setShowContent(true)}>
                        <span>Xem thông tin</span>
                        <i className='bx bx-chevron-right' ></i>
                    </div>
                    <div className={`project-des__mobile__content ${showContent ? 'active' : ''}`}>
                        <div className="project-des__mobile__content__toggle">
                            <span>Tiếng Việt</span>
                            <i className='bx bx-chevron-right' ></i>
                        </div>
                        <div className="project-des__mobile__content__description">
                            <p><i className='bx bxs-circle'></i><strong>Diện tích khu đất: </strong>{getProjectBySlug.area} m2</p>
                            <p><i className='bx bxs-circle'></i><strong>Năm: </strong>{getProjectBySlug.year}</p>
                            <p><i className='bx bxs-circle'></i><strong>Loại hình dự án: </strong>
                                {getProjectBySlug.type === 'archi' && 'Kiến trúc'}
                                {getProjectBySlug.type === 'inter' && 'Nội thất'}
                                {getProjectBySlug.type === 'land' && 'Cảnh quan'}
                            </p>
                            <div className="project-des__mobile__content__description__content" dangerouslySetInnerHTML={{ __html: getProjectBySlug.description }}>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`project-albums ${showContent ? 'remove' : ''}`}>
                    <Gallerry />
                </div>
            </div>
        </Helmet>
    )
}

export default ProjectView
