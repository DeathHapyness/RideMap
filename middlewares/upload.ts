import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (_req: any, _file: any, cb: any) => cb(null, 'uploads/avatars/'),
  filename: (req: any, file: any, cb: any) => {
    const userId = req.session.user?.id || 'anonymous';
    const ext = path.extname(file.originalname);
    cb(null, `user-${userId}${ext}`);
  }
});

const fileFilter = (_req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
  const ext = path.extname(file.originalname).toLowerCase();
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif'];

  if (allowedTypes.includes(file.mimetype) || allowedExtensions.includes(ext)) {
    cb(null, true);
    return;
  }

  cb(new Error('Apenas imagens são permitidas!'));
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }
});

export default upload;
