import React from 'react'
import { useSelector } from 'react-redux'
import BlogItem from './BlogItem';

const ListBlog = () => {
    const blogs = useSelector(state => state.blog.blogs);

    return (
        <div className='list-project'>
            <h1>Danh sách Blog</h1>
            <table>
                <thead>
                    <tr>
                        <th>Hình ảnh</th>
                        <th>Tiêu đề</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        blogs && blogs.map((item, index) => (
                            <BlogItem key={index} item={item} />
                        ))
                    }
                </tbody>
            </table>

        </div>
    )
}

export default ListBlog