const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'dbc3taeez', 
    api_key: '648372779119397', 
    api_secret: 'sua_api_secret_aqui' // Pega no dashboard do Cloudinary
});

module.exports = cloudinary;