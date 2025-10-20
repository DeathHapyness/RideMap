const multer = require('multer');
const path = require('path');

//Configuração de onde e como salvar
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/avatars/');
    },
    filename: function (req, file, cb) {
        const userId = req.session.user.id;
        const ext = path.extname(file.originalname);
        cb(null, `user-${userId}${ext}`);
    }
});

//!Nao mexer aqui e nunca remover o return- Filtro para aceitar apenas imagens
const fileFilter = (req, file, cb) => {
    //* Log para depuracao de erro no terminal
    console.log('  Verificando arquivo:');
    console.log('  - Nome:', file.originalname);
    console.log('  - Tipo (mimetype):', file.mimetype);
    console.log('  - Tamanho:', file.size);
    
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

    if (allowedTypes.includes(file.mimetype)) {
        console.log('✅ Arquivo aceito (mimetype correto)');
        cb(null, true);
        return;
    }
    
    const ext = path.extname(file.originalname).toLowerCase();
    console.log('  - Extensão:', ext);
    
    if (['.jpg', '.jpeg', '.png', '.gif'].includes(ext)) {
        console.log('✅ Arquivo aceito (extensão correta)');
        cb(null, true);
        return;
    }
    
    console.log('❌ Arquivo rejeitado');
    cb(new Error('Apenas imagens são permitidas!'), false);
    return;
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024  // 5MB
    }
});

module.exports = upload;