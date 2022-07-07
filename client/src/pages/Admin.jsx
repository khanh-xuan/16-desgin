import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AddProject from '../components/AddProject';
import EditProject from '../components/EditProject';
import Helmet from '../components/Helmet'
import ListProject from '../components/ListProject';
import { ACCESS_TOKEN_NAME, API_URL } from '../constants/constants';
import { AdminActions } from '../redux/admin/adminSlice';
import { loginActions } from '../redux/login/loginSlice';
import setAuthToken from '../utils/setAuthToken'



const Admin = () => {
    // const [show, setShow] = useState('listProject');

    const show = useSelector(state => state.admin.show) || 'listProject'

    const dispatch = useDispatch()

    //authentication 
    useEffect(() => {
        const loadUser = async () => {
            if (localStorage[ACCESS_TOKEN_NAME]) {
                setAuthToken(localStorage[ACCESS_TOKEN_NAME])
            }

            try {
                const response = await axios.get(`${API_URL}/auth`)
                if (response.data.success) {
                    dispatch(loginActions.setAuth({ isAuthenticated: true, user: response.data.user }))
                }
            } catch (error) {
                localStorage.removeItem(ACCESS_TOKEN_NAME)
                localStorage.removeItem('isAuthenticated')
                setAuthToken(null)
                dispatch(loginActions.loginFailed())
            }
        }
        loadUser()
    }, [dispatch]);

    return (
        <Helmet title='Admin'>
            <div className="admin">
                <div className="admin__nav">
                    <div className={`admin__nav__item ${show === 'addProject' ? 'active' : ''}`} onClick={() => dispatch(AdminActions.setShow('addProject'))}>
                        Thêm project mới
                    </div>
                    <div className={`admin__nav__item ${show === 'listProject' ? 'active' : ''}`} onClick={() => dispatch(AdminActions.setShow('listProject'))}>
                        Danh sách project
                    </div>
                    <div className={`admin__nav__item ${show === 'addBlog' ? 'active' : ''}`} onClick={() => dispatch(AdminActions.setShow('addBlog'))}>
                        Thêm blog mới
                    </div>
                    <div className={`admin__nav__item ${show === 'listBlog' ? 'active' : ''}`} onClick={() => dispatch(AdminActions.setShow('listBlog'))}>
                        Danh sách blog
                    </div>
                </div>
                <div className="admin__container">
                    {show === 'addProject' && <AddProject />}
                    {show === 'listProject' && <ListProject />}
                    {show === 'editProject' && <EditProject />}
                </div>
            </div>
        </Helmet>
    )
}

export default Admin
