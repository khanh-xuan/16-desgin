import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import axios from 'axios'

//text edittor 
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import { API_URL } from '../constants/constants';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingActions } from '../redux/loading/loadingSlice';
import { projectAction } from '../redux/project/projectSlice';

const EditProject = () => {
    const project = useSelector(state => state.admin.edit)

    //text edittor
    const blocksFromHtml = htmlToDraft(project.description);
    const { contentBlocks, entityMap } = blocksFromHtml;
    const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
    const editorState1 = EditorState.createWithContent(contentState);

    const [editorState, SetEditorState] = useState(editorState1)

    const onEditorStateChange = (editorState) => {
        SetEditorState(editorState)
    };

    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {

        const description = draftToHtml(convertToRaw(editorState.getCurrentContent()));


        const up = {
            ...data,
            image: data.image[0]?.name || project.image,
            description
        }

        const updatedProject = JSON.stringify(up)

        const formData = new FormData();
        formData.append('image', data.image[0])
        formData.set('projectUpdate', updatedProject)

        for (let index = 0; index < data.images.length; index++) {
            formData.append('images', data.images[index])
        }

        const updateProject = async () => {
            dispatch(LoadingActions.setLoading())
            const res = await axios.put(`${API_URL}/project/${project._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (res.data.success) {
                dispatch(LoadingActions.loadingSuccess())
                dispatch(projectAction.updateProject(res.data.project))
                alert('Sửa Project thành công!')
            }
        }

        updateProject()
    };

    return (
        project && <div className='add-project'>
            <h1>Chỉnh sửa Project</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="title">
                    <span>Tên Project: </span>
                    <input
                        id='title'
                        placeholder='Tên của project'
                        {...register("title", { required: true })}
                        defaultValue={project.title}
                    />
                </label>
                {errors.title && <span className='error'>Tên project không được để trống</span>}

                <label htmlFor="slug">
                    <span>Slug Project: </span>
                    <input
                        id='slug'
                        placeholder='Tên ngắn gọn'
                        {...register("slug", { required: true })}
                        defaultValue={project.slug}
                    />
                </label>
                {errors.slug && <span className='error'>Tên ngắn gọn không được để trống</span>}

                <label htmlFor="add">
                    <span>Địa điểm: </span>
                    <input
                        id='add'
                        placeholder='Địa điểm'
                        {...register("add", { required: true })}
                        defaultValue={project.add}
                    />
                </label>
                {errors.add && <span className='error'>Địa điểm không được để trống</span>}
                <label htmlFor="year">
                    <span>Năm: </span>
                    <input
                        id='year'
                        placeholder='Năm hoàn thành'
                        {...register("year", { required: true })}
                        defaultValue={project.year}
                    />
                </label>
                {errors.year && <span className='error'>Năm hoàn thành không được để trống</span>}

                <label htmlFor="area">
                    <span>Diện tích: </span>
                    <input
                        id='area'
                        placeholder='Diện tích khu đất'
                        {...register("area", { required: true })}
                        defaultValue={project.area}
                    />
                </label>
                {errors.area && <span className='error'>Diện tích không được để trống</span>}

                <label htmlFor="type">
                    <span>Loại hình dự án: </span>
                    <select id='type' {...register("type", { required: true })} defaultValue={project.type}>
                        <option value="archi">Kiến trúc</option>
                        <option value="inter">Nội thất</option>
                        <option value="land">Cảnh quan</option>
                    </select>
                </label>
                {errors.type && <span className='error'>Loại hình dự án không được để trống</span>}

                <label htmlFor="image">
                    <span>Hỉnh ảnh: </span>
                    <input
                        id='image'
                        type="file"
                        {...register("image")}
                    />
                </label>
                <img src={project.image} alt="" />

                <h3>Mô tả về dự án</h3>
                <Editor
                    defaultContentState={contentState}
                    editorState={editorState}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    onEditorStateChange={onEditorStateChange}
                />

                <label htmlFor="images">
                    <span>Albums Ảnh: </span>
                    <input
                        id='images'
                        type="file"
                        {...register("images")}
                        multiple
                    />
                </label>

                <button type="submit">Chỉnh sửa</button>
            </form>
        </div>
    )
}

export default EditProject
