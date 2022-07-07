import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux';
import { AdminActions } from '../redux/admin/adminSlice';

const ProjectItem = props => {
    const project = props.item;
    const dispatch = useDispatch();

    const handleEditProject = () => {
        dispatch(AdminActions.setShow('editProject'));
        dispatch(AdminActions.setEdit(project));
    }

    const handleDeleteProject = () => {
        console.log('delete');
    }

    return (
        <tr>
            <td className='list-project__image'>
                <img src={project.image} alt="" />
            </td>
            <td className='list-project__title'>{project.title}</td>
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