import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import { AdminActions } from '../redux/admin/adminSlice';
import { LoadingActions } from '../redux/loading/loadingSlice';
import axios from 'axios';
import { API_URL } from '../constants/constants';
import { Link } from 'react-router-dom';
import { projectAction } from '../redux/project/projectSlice';

const ProjectItem = props => {
    const project = props.item;
    const dispatch = useDispatch();

    const handleEditProject = () => {
        dispatch(AdminActions.setShow('editProject'));
        dispatch(AdminActions.setEdit(project));
    }

    const handleDeleteProject = async () => {
        if (window.confirm("bạn chắc chắn muốn xóa!")) {
            dispatch(LoadingActions.setLoading());
            const res = await axios.delete(`${API_URL}/project/${project._id}`)

            if (res.data.success) {
                dispatch(LoadingActions.loadingSuccess());
                dispatch(projectAction.deleteProject(project._id))
                alert("Xóa Project thành công!")
            }
        }
    }

    return (
        <tr>
            <td className='list-project__image'>
                <img src={project.image} alt="" />
            </td>
            <td className='list-project__title'>
                <Link to={`/project/${project.slug}`}>
                    {project.title}
                </Link>
            </td>
            <td>{project.year}</td>
            <td>{project.add}</td>
            <td>{project.area}</td>
            <td>
                {project.type === 'archi' && 'Kiến trúc'}
                {project.type === 'inter' && 'Nội thất'}
                {project.type === 'land' && 'Cảnh quan'}
            </td>
            <td><i onClick={handleEditProject} className="bx bx-edit"></i></td>
            <td><i onClick={handleDeleteProject} className="bx bx-trash"></i></td>
        </tr>
    )
}

ProjectItem.propTypes = {
    item: PropTypes.object
}

export default ProjectItem