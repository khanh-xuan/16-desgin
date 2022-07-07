const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: 'design16',
    api_key: '517178484662323',
    api_secret: 'x0YATYtYFgcNaBD4kTNQYsksjFA'
});

module.exports = cloudinary;