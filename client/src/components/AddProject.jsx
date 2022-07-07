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

const AddProject = () => {
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

        const project = JSON.stringify(pj)

        const formData = new FormData();
        formData.append('image', data.image[0])
        formData.set('project', project)

        const addProject = async () => {
            dispatch(LoadingActions.setLoading())
            const res = await axios.post(`${API_URL}/project`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (res.data.success) {
                dispatch(LoadingActions.loadingSuccess())
                alert('Thêm Project thành công!')
            }
        }

        addProject()
    };

    return (
        <div className='add-project'>
            <h1>Thêm Project mới</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="title">
                    <span>Tên Project: </span>
                    <input
                        id='title'
                        placeholder='Tên của project'
                        {...register("title", { required: true })}
                    />
                </label>
                {errors.title && <span className='error'>Tên project không được để trống</span>}

                <label htmlFor="slug">
                    <span>Slug Project: </span>
                    <input
                        id='slug'
                        placeholder='Tên ngắn gọn'
                        {...register("slug", { required: true })}
                    />
                </label>
                {errors.slug && <span className='error'>Tên ngắn gọn không được để trống</span>}

                <label htmlFor="add">
                    <span>Địa điểm: </span>
                    <input
                        id='add'
                        placeholder='Địa điểm'
                        {...register("add", { required: true })}
                    />
                </label>
                {errors.add && <span className='error'>Địa điểm không được để trống</span>}
                <label htmlFor="year">
                    <span>Năm: </span>
                    <input
                        id='year'
                        placeholder='Năm hoàn thành'
                        {...register("year", { required: true })}
                    />
                </label>
                {errors.year && <span className='error'>Năm hoàn thành không được để trống</span>}

                <label htmlFor="area">
                    <span>Diện tích: </span>
                    <input
                        id='area'
                        placeholder='Diện tích khu đất'
                        {...register("area", { required: true })}
                    />
                </label>
                {errors.area && <span className='error'>Diện tích không được để trống</span>}

                <label htmlFor="type">
                    <span>Loại hình dự án: </span>
                    <select id='type' {...register("type", { required: true })}>
                        <option value="archi">Kiến trúc</option>
                        <option value="inter">Nội thất</option>
                        <option value="land">Cảnh quan</option>
                    </select>
                </label>
                {errors.type && <span className='error'>Loại hình dự án không được để trống</span>}

                <label htmlFor="image">
                    <span>Diện tích: </span>
                    <input
                        id='image'
                        type="file"
                        {...register("image", { required: true })}
                    />
                </label>
                {errors.image && <span className='error'>Diện tích không được để trống</span>}

                <h3>Mô tả về dự án</h3>
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

export default AddProject
