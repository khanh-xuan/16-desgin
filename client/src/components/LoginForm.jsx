import React from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { API_URL, ACCESS_TOKEN_NAME } from '../constants/constants'
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '../redux/login/loginSlice';
import { Navigate, useNavigate } from 'react-router-dom'

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const userLogged = useSelector(state => state.login.isAuthenticated);

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const onSubmit = async (data) => {
        if (!errors.username && !errors.password) {
            dispatch(loginActions.login())
            const loginUser = async () => {
                try {
                    const response = await axios.post(`${API_URL}/auth/login`, data)
                    if (response.data.success) {
                        dispatch(loginActions.loginSuccess(response.data))
                        localStorage.setItem(
                            ACCESS_TOKEN_NAME,
                            response.data.accessToken
                        )
                        navigate('/admin')
                        return response.data
                    } else {
                        dispatch(loginActions.loginFailed())
                    }

                } catch (error) {
                    if (error.response.data) return error.response.data
                    else return { success: false, message: error.message }
                }
            }
            await loginUser();
        }
    };

    return (
        !userLogged ?
            <div className="login__form">
                <h2>Đăng nhập</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        placeholder='Nhập vào Username'
                        {...register("username", { required: true })}
                    />
                    {errors.username && <span>Username không được để trống</span>}

                    <input
                        type="password"
                        placeholder='Nhập vào Password'
                        {...register("password", { required: true })}
                    />
                    {errors.password && <span>Password không được để trống</span>}

                    <button type='submit'>
                        Login
                    </button>
                </form>
            </div>
            : <Navigate to='/admin' />
    );
}

export default LoginForm
