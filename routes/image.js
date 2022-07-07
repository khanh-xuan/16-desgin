const express = require('express')

const Image = require('../models/Image')


const router = express.Router()


// @route GET api/image
// @desc GET List Image 
// @access Private
router.get('/', async (req, res) => {
    try {
        const images = await Image.find()

        res.json({ success: true, images })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})


// @route GET api/image
// @desc GET List Image By ProductId
// @access Private
router.get('/:projectSlug', async (req, res) => {
    try {
        const { projectSlug } = req.params
        const images = await Image.findOne({ projectSlug })

        res.json({ success: true, images })
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Internal server error' })
    }
})

module.exports = router
