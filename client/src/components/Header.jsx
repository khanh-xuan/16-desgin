import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {

    return (
        <div className="header">
            <div className="header__logo">
                <Link to="/">
                    <img src="../logo-1.jpg" alt="" />
                </Link>
            </div>
        </div>
    )
}

export default Header
