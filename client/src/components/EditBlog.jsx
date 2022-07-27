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
import { blogAction } from '../redux/blog/blogSlice';

const EditBlog = () => {
    const blog = useSelector(state => state.admin.edit)

    //text edittor
    const blocksFromHtml = htmlToDraft(blog.description);
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
            image: data.image[0]?.name || blog.image,
            description
        }

        const updatedBlog = JSON.stringify(up)

        const formData = new FormData();
        if (data.image) {
            formData.append('image', data.image[0])
        }
        formData.set('updatedBlog', updatedBlog)

        const updateBlog = async () => {
            dispatch(LoadingActions.setLoading())
            const res = await axios.put(`${API_URL}/blog/${blog._id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })

            if (res.data.success) {
                dispatch(LoadingActions.loadingSuccess())
                dispatch(blogAction.updateBlog(res.data.blog))
                alert('Sửa Blog thành công!')
            }
        }

        updateBlog()
    };

    return (
        blog && <div className='add-project'>
            <h1>Chỉnh sửa Blog</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="title">
                    <span>Tiêu đề Blog: </span>
                    <input
                        id='title'
                        placeholder='Tiêu đề của project'
                        {...register("title", { required: true })}
                        defaultValue={blog.title}
                    />
                </label>
                {errors.title && <span className='error'>Tiêu đề blog không được để trống</span>}

                <label htmlFor="slug">
                    <span>Slug Blog: </span>
                    <input
                        id='slug'
                        placeholder='Tên ngắn gọn'
                        {...register("slug", { required: true })}
                        defaultValue={blog.slug}
                    />
                </label>
                {errors.slug && <span className='error'>Tên ngắn gọn không được để trống</span>}

                <label htmlFor="image">
                    <span>Hỉnh ảnh: </span>
                    <input
                        id='image'
                        type="file"
                        {...register("image")}
                    />
                </label>
                <img src={blog.image} alt="" />

                <h3>Mô tả về dự án</h3>
                <Editor
                    defaultContentState={contentState}
                    editorState={editorState}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    onEditorStateChange={onEditorStateChange}
                />

                <button type="submit">Chỉnh sửa</button>
            </form>
        </div>
    )
}

export default EditBlog
