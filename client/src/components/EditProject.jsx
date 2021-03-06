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
                alert('S???a Project th??nh c??ng!')
            }
        }

        updateProject()
    };

    return (
        project && <div className='add-project'>
            <h1>Ch???nh s???a Project</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="title">
                    <span>T??n Project: </span>
                    <input
                        id='title'
                        placeholder='T??n c???a project'
                        {...register("title", { required: true })}
                        defaultValue={project.title}
                    />
                </label>
                {errors.title && <span className='error'>T??n project kh??ng ???????c ????? tr???ng</span>}

                <label htmlFor="slug">
                    <span>Slug Project: </span>
                    <input
                        id='slug'
                        placeholder='T??n ng???n g???n'
                        {...register("slug", { required: true })}
                        defaultValue={project.slug}
                    />
                </label>
                {errors.slug && <span className='error'>T??n ng???n g???n kh??ng ???????c ????? tr???ng</span>}

                <label htmlFor="add">
                    <span>?????a ??i???m: </span>
                    <input
                        id='add'
                        placeholder='?????a ??i???m'
                        {...register("add", { required: true })}
                        defaultValue={project.add}
                    />
                </label>
                {errors.add && <span className='error'>?????a ??i???m kh??ng ???????c ????? tr???ng</span>}
                <label htmlFor="year">
                    <span>N??m: </span>
                    <input
                        id='year'
                        placeholder='N??m ho??n th??nh'
                        {...register("year", { required: true })}
                        defaultValue={project.year}
                    />
                </label>
                {errors.year && <span className='error'>N??m ho??n th??nh kh??ng ???????c ????? tr???ng</span>}

                <label htmlFor="area">
                    <span>Di???n t??ch: </span>
                    <input
                        id='area'
                        placeholder='Di???n t??ch khu ?????t'
                        {...register("area", { required: true })}
                        defaultValue={project.area}
                    />
                </label>
                {errors.area && <span className='error'>Di???n t??ch kh??ng ???????c ????? tr???ng</span>}

                <label htmlFor="type">
                    <span>Lo???i h??nh d??? ??n: </span>
                    <select id='type' {...register("type", { required: true })} defaultValue={project.type}>
                        <option value="archi">Ki???n tr??c</option>
                        <option value="inter">N???i th???t</option>
                        <option value="land">C???nh quan</option>
                    </select>
                </label>
                {errors.type && <span className='error'>Lo???i h??nh d??? ??n kh??ng ???????c ????? tr???ng</span>}

                <label htmlFor="image">
                    <span>H???nh ???nh: </span>
                    <input
                        id='image'
                        type="file"
                        {...register("image")}
                    />
                </label>
                <img src={project.image} alt="" />

                <h3>M?? t??? v??? d??? ??n</h3>
                <Editor
                    defaultContentState={contentState}
                    editorState={editorState}
                    wrapperClassName="wrapper-class"
                    editorClassName="editor-class"
                    toolbarClassName="toolbar-class"
                    onEditorStateChange={onEditorStateChange}
                />

                <label htmlFor="images">
                    <span>Albums ???nh: </span>
                    <input
                        id='images'
                        type="file"
                        {...register("images")}
                        multiple
                    />
                </label>

                <button type="submit">Ch???nh s???a</button>
            </form>
        </div>
    )
}

export default EditProject
