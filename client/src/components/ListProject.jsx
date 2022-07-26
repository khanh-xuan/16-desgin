import React from 'react'
import { useSelector } from 'react-redux'
import ProjectItem from './ProjectItem';

const ListProject = () => {
    const projects = useSelector(state => state.project.projects);

    return (
        <div className='list-project'>
            <h1>Danh sách Project</h1>
            <table>
                <thead>
                    <tr>
                        <th>Hình ảnh</th>
                        <th>Tên</th>
                        <th>Năm</th>
                        <th>Địa điểm</th>
                        <th>Diện tích</th>
                        <th>Loại hình</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        projects && projects.map((item, index) => (
                            <ProjectItem key={index} item={item} />
                        ))
                    }
                </tbody>
            </table>

        </div>
    )
}

export default ListProject