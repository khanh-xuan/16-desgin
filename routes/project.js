const express = require('express')

const Project = require('../models/Project')
const Image = require('../models/Image')
const verifyToken = require('../middlewares/auth')
const multiUpload = require('../middlewares/uploadImage')
const cloudinary = require("../utils/cloudinary");


const router = express.Router()

// @route GET api/projects
// @desc GET List projects
// @access Public
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find()
        res.json({ success: true, projects })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})


// @route POST api/product
// @desc POST CREATE Product
// @access PRIVATE
router.post('/', verifyToken, multiUpload, async (req, res) => {
    try {
        const project = JSON.parse(req.body.project);
        const { title, slug, add, year, area, type, description } = project

        // const image = req.files.image[0].filename

        const image = await cloudinary.uploader.upload(req.files.image[0].path, {
            upload_preset: '16design'
        });

        if (!title || !add || !year || !area || !type || !slug)
            return res.status(400).json({ success: false, message: 'Information is require' })

        try {
            const newProject = new Project({ title, slug, add, year, area, type, description, image: image.url })
            await newProject.save();
            res.json({ success: true, message: 'Project created successful', project: newProject })
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Internal server error' })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})


// @route POST api/product
// @desc POST CREATE Product
// @access PRIVATE
router.put('/:id', verifyToken, multiUpload, async (req, res) => {
    try {
        const projectUpdate = JSON.parse(req.body.projectUpdate);
        const { title, add, year, area, type, description, image, slug } = projectUpdate;
        const projectId = req.params.id
        const projectSlug = slug;

        let img = '';
        if (req.files.image) {
            const upload = await cloudinary.uploader.upload(req.files.image[0].path, {
                upload_preset: '16design'
            });
            img = upload.url
        } else {
            img = image
        }

        let albums = [];
        if (req.files.images) {
            for (let index = 0; index < req.files.images.length; index++) {
                const als = await cloudinary.uploader.upload(req.files.images[index].path, {
                    upload_preset: '16design'
                });
                albums.push(als.url)
            }

            const imageCheck = await Image.findOne({ projectSlug })

            if (!imageCheck) {
                const newAlbums = new Image({ projectSlug, images: albums })
                await newAlbums.save();
            } else {
                let als = imageCheck.images.concat(albums)
                await Image.findOneAndUpdate({ projectSlug }, { images: als }, { new: true })
            }
        }

        if (!title || !add || !year || !area || !type || !slug)
            return res.status(400).json({ success: false, message: 'Information is require' })

        try {
            let updateProject = { title, add, year, area, type, description, slug, image: img }
            const projectUpdateCondition = { _id: projectId, user: req.userId }

            updateProject = await Project.findOneAndUpdate(projectUpdateCondition, updateProject, { new: true })

            if (!updateProject)
                return res.status(401).json({ success: false, message: 'Project not found or user not authorised' })


            res.json({ success: true, message: 'Updated Success', project: updateProject })
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: 'Internal server error' })
        }


    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

router.delete('/:id', verifyToken, async (req, res) => {
    try {
        const deleteProjectCondition = { _id: req.params.id, user: req.userId }
        const deleteProject = await Project.findOneAndDelete(deleteProjectCondition)

        //User not authorised to update order or order not found
        if (!deleteProject)
            return res.status(401).json({ success: false, message: 'Project not found or user not authorised' })

        res.json({ success: true, message: 'Deleted Success', project: deleteProject })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})


module.exports = router
