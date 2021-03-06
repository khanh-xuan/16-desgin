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
                alert('S???a Blog th??nh c??ng!')
            }
        }

        updateBlog()
    };

    return (
        blog && <div className='add-project'>
            <h1>Ch???nh s???a Blog</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="title">
                    <span>Ti??u ????? Blog: </span>
                    <input
                        id='title'
                        placeholder='Ti??u ????? c???a project'
                        {...register("title", { required: true })}
                        defaultValue={blog.title}
                    />
                </label>
                {errors.title && <span className='error'>Ti??u ????? blog kh??ng ???????c ????? tr???ng</span>}

                <label htmlFor="slug">
                    <span>Slug Blog: </span>
                    <input
                        id='slug'
                        placeholder='T??n ng???n g???n'
                        {...register("slug", { required: true })}
                        defaultValue={blog.slug}
                    />
                </label>
                {errors.slug && <span className='error'>T??n ng???n g???n kh??ng ???????c ????? tr???ng</span>}

                <label htmlFor="image">
                    <span>H???nh ???nh: </span>
                    <input
                        id='image'
                        type="file"
                        {...register("image")}
                    />
                </label>
                <img src={blog.image} alt="" />

                <h3>M?? t??? v??? d??? ??n</h3>
                <Editor
                    defaultContentState={contentState}
                    editorState={editorState}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    onEditorStateChange={onEditorStateChange}
                />

                <button type="submit">Ch???nh s???a</button>
            </form>
        </div>
    )
}

export default EditBlog
