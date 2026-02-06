require('dotenv').config();  // PRIMEIRO!

const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

const imageUrl = cloudinary.url('background-404_qslrji', {
  transformation: [
    { quality: 'auto' },
    { fetch_format: 'auto' },
    { width: 1200 }
  ]
});

console.log('Image URL:', imageUrl);

module.exports = cloudinary;