
const multer = require('multer')

const multerConfig = multer.diskStorage({
    // destination: (req, file, callback) => {
    //     // callback(null, './client/build/uploads/')
    //     callback(null, './uploads/')
    // },
    filename: (req, file, callback) => {
        const ext = file.mimetype.split('/')[1]
        callback(null, `image-${Date.now()}.${ext}`)
    }
})

const isImage = (req, file, callback) => {
    if (file.mimetype.startsWith('image')) {
        callback(null, true)
    } else {
        callback(new Error('Only Image is Allowed...'))
    }
}

const upload = multer({
    storage: multerConfig,
    fileFilter: isImage,
})



const multiUpload = upload.fields([{ name: 'image' }, { name: 'images', maxCount: 10 }])
// const multiUpload = upload.array('images', 10)

// const uploadImage1 = upload.single('image01')
// const uploadImage2 = upload.single('image02')


module.exports = multiUpload
