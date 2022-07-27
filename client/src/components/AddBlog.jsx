import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios'

//text edittor 
import { ContentState, convertToRaw } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import { API_URL } from '../constants/constants';
import { useDispatch } from 'react-redux';
import { LoadingActions } from '../redux/loading/loadingSlice';
import { blogAction } from '../redux/blog/blogSlice';

const AddBlog = () => {
    //text-edittor
    let _contentState = ContentState.createFromText('...');
    const raw = convertToRaw(_contentState)
    const [contentState, setContentState] = useState(raw) // ContentState JSON

    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        const description = draftToHtml(contentState);

        const pj = {
            ...data,
            image: data.image[0].name,
            description
        }

        const blog = JSON.stringify(pj)

        const formData = new FormData();
        formData.append('image', data.image[0])
        formData.set('blog', blog)

        const addBlog = async () => {
            dispatch(LoadingActions.setLoading())
            const res = await axios.post(`${API_URL}/blog`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (res.data.success) {
                dispatch(LoadingActions.loadingSuccess())
                dispatch(blogAction.addBlog(res.data.blog))
                alert('Thêm Blog thành công!')
            }
        }

        addBlog()
    };

    return (
        <div className='add-project'>
            <h1>Thêm Project mới</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="title">
                    <span>Tiêu đề Blog: </span>
                    <input
                        id='title'
                        placeholder='Tiêu đề của blog'
                        {...register("title", { required: true })}
                    />
                </label>
                {errors.title && <span className='error'>Tiêu đề của blog không được để trống</span>}

                <label htmlFor="slug">
                    <span>Slug Blog: </span>
                    <input
                        id='slug'
                        placeholder='Tên ngắn gọn'
                        {...register("slug", { required: true })}
                    />
                </label>
                {errors.slug && <span className='error'>Tên ngắn gọn không được để trống</span>}

                <label htmlFor="image">
                    <span>Hình Ảnh: </span>
                    <input
                        id='image'
                        type="file"
                        {...register("image", { required: true })}
                    />
                </label>
                {errors.image && <span className='error'>Hình ảnh không được để trống</span>}

                <h3>Nội dung</h3>
                <Editor
                    defaultContentState={contentState}
                    onContentStateChange={setContentState}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                />

                <button type="submit">Thêm mới</button>
            </form>
        </div>
    )
}

export default AddBlog
