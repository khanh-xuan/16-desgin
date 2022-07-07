const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ImageSchema = new Schema({
    projectSlug: {
        type: String,
        required: true
    },
    images: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('images', ImageSchema)