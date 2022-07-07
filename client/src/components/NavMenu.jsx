import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';



const NavMenu = ({ mobile }) => {

    const [show, setShow] = useState(false);
    const path = useLocation();

    const params = useParams();

    const filter = params.project;

    useEffect(() => {
        window.onclick = (e) => {
            if (show) {
                if (e.target !== document.querySelector('.nav-menu__content') && !e.target.closest('.nav-menu__mobile-toggle')) {
                    setShow(!show)
                }
            }
        }
    })

    return (
        <div className={`nav-menu ${mobile ? 'mobile' : ''}`}>
            <div onClick={() => setShow(!show)} className={`nav-menu__mobile-toggle ${show ? 'disable' : ''}`}>
                <i className='bx  bx-menu'></i>
            </div>
            <div className={`nav-menu__content ${show ? 'active' : ''}`}>
                <i onClick={() => setShow(!show)} className='bx  bx-x'></i>
                <div className={`nav-menu__content__item ${path.pathname === '/' ? 'active' : ''}`}>
                    <Link to="/"><h2>Project</h2></Link>
                    <Link to="/archi" ><p className={`${filter === 'archi' ? 'active' : ''}`}>. architecture</p></Link>
                    <Link to="/inter" ><p className={`${filter === 'inter' ? 'active' : ''}`}>. interior design</p></Link>
                    <Link to="/land" ><p className={`${filter === 'land' ? 'active' : ''}`}>. landscape</p></Link>
                </div>
                <Link to="/blogs" className={`nav-menu__content__item ${path.pathname === '/blogs' ? 'active' : ''}`}>
                    <h2>Blog</h2>
                </Link>
                <Link to="/about" className={`nav-menu__content__item ${path.pathname === '/about' ? 'active' : ''}`}>
                    <h2>About Us</h2>
                </Link>
                <Link to="/contact" className={`nav-menu__content__item ${path.pathname === '/contact' ? 'active' : ''}`}>
                    <h2>Contact</h2>
                </Link>
            </div>
            <div className="nav-menu__social">
                <a target="_blank" rel="noopener noreferrer" href="https://facebook.com" className="nav-menu__social__fb">
                    <i className='bx bxl-facebook'></i>
                </a>
                <a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/" className="nav-menu__social__ins">
                    <i className='bx bxl-instagram' ></i>
                </a>
            </div>
        </div>
    )
}

export default NavMenu
