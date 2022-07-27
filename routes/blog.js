const express = require('express')

const Blog = require('../models/Blog')
const verifyToken = require('../middlewares/auth')
const multiUpload = require('../middlewares/uploadImage')
const cloudinary = require("../utils/cloudinary");


const router = express.Router()

// @route GET api/projects
// @desc GET List projects
// @access Public
router.get('/', async (req, res) => {
    try {
        const blogs = await Blog.find()
        res.json({ success: true, blogs })
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
        const blog = JSON.parse(req.body.blog);
        const { title, slug, description } = blog

        // const image = req.files.image[0].filename

        const image = await cloudinary.uploader.upload(req.files.image[0].path, {
            upload_preset: '16design'
        });

        if (!title || !slug)
            return res.status(400).json({ success: false, message: 'Information is require' })

        try {
            const newBlog = new Blog({ title, slug, description, image: image.url })
            await newBlog.save();
            res.json({ success: true, message: 'Project created successful', blog: newBlog })
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
        const blogUpdate = JSON.parse(req.body.updatedBlog);
        const { title, description, image, slug } = blogUpdate;
        const blogId = req.params.id

        let img = '';
        if (req.files.image) {
            const upload = await cloudinary.uploader.upload(req.files.image[0].path, {
                upload_preset: '16design'
            });
            img = upload.url
        } else {
            img = image
        }

        if (!title || !slug)
            return res.status(400).json({ success: false, message: 'Information is require' })

        try {
            let updateBlog = { title, description, slug, image: img }
            const blogUpdateCondition = { _id: blogId, user: req.userId }

            updateBlog = await Blog.findOneAndUpdate(blogUpdateCondition, updateBlog, { new: true })

            if (!updateBlog)
                return res.status(401).json({ success: false, message: 'Blog not found or user not authorised' })


            res.json({ success: true, message: 'Updated Success', blog: updateBlog })
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
        const deleteBlogCondition = { _id: req.params.id, user: req.userId }
        const deleteBlog = await Blog.findOneAndDelete(deleteBlogCondition)

        //User not authorised to update order or order not found
        if (!deleteBlog)
            return res.status(401).json({ success: false, message: 'Blog not found or user not authorised' })

        res.json({ success: true, message: 'Deleted Success', blog: deleteBlog })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})


module.exports = router
