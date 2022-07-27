import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import { AdminActions } from '../redux/admin/adminSlice';
import { LoadingActions } from '../redux/loading/loadingSlice';
import axios from 'axios';
import { API_URL } from '../constants/constants';
import { blogAction } from '../redux/blog/blogSlice';

const BlogItem = props => {
    const blog = props.item;
    const dispatch = useDispatch();

    const handleEditBlog = () => {
        dispatch(AdminActions.setShow('editBlog'));
        dispatch(AdminActions.setEdit(blog));
    }

    const handleDeleteBlog = async () => {
        if (window.confirm("bạn chắc chắn muốn xóa!")) {
            dispatch(LoadingActions.setLoading());
            const res = await axios.delete(`${API_URL}/blog/${blog._id}`)

            if (res.data.success) {
                dispatch(LoadingActions.loadingSuccess());
                dispatch(blogAction.deleteBlog(blog._id));
                alert("Xóa blog thành công!")
            }
        }
    }

    return (
        <tr>
            <td className='list-project__image'>
                <img src={blog.image} alt="" />
            </td>
            <td className='list-project__title'>{blog.title}</td>
            <td><i onClick={handleEditBlog} className="bx bx-edit"></i></td>
            <td><i onClick={handleDeleteBlog} className="bx bx-trash"></i></td>
        </tr>
    )
}

BlogItem.propTypes = {
    item: PropTypes.object
}

export default BlogItem