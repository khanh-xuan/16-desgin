import React from 'react'
import Helmet from '../components/Helmet'
import LoginForm from '../components/LoginForm'
import NavMenu from '../components/NavMenu'

const Login = () => {

    return (
        <Helmet title='login'>
            <NavMenu />
            <div className="login">
                <LoginForm />
            </div>
        </Helmet>
    )
}

export default Login
