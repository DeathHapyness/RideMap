"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => cb(null, 'uploads/avatars/'),
    filename: (req, file, cb) => {
        const userId = req.session.user?.id || 'anonymous';
        const ext = path_1.default.extname(file.originalname);
        cb(null, `user-${userId}${ext}`);
    }
});
const fileFilter = (_req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    const ext = path_1.default.extname(file.originalname).toLowerCase();
    const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
    if (allowedTypes.includes(file.mimetype) || allowedExtensions.includes(ext)) {
        cb(null, true);
        return;
    }
    cb(new Error('Apenas imagens são permitidas!'));
};
const upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 }
});
exports.default = upload;
