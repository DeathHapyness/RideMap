const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('./cloudinary');

const avatarStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ridemap/avatars', 
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [
      { width: 500, height: 500, crop: 'fill' }, 
      { quality: 'auto' }
    ]
  }
});

const pistaStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ridemap/pistas',
    allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
    transformation: [
      { width: 1200, quality: 'auto' }
    ]
  }
});

const uploadAvatar = multer({ 
  storage: avatarStorage,
  limits: { fileSize: 5 * 1024 * 1024 }
});

const uploadPista = multer({ 
  storage: pistaStorage,
  limits: { fileSize: 10 * 1024 * 1024 } 
});

module.exports = { uploadAvatar, uploadPista };