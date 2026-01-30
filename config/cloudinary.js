const cloudinary = require('cloudinary').v2;
    console.log('Cloudinary configurado com sucesso'); 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});