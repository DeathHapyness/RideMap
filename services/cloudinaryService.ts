import cloudinary from '../config/cloudinary';

export async function uploadImage(filePath: string) {
  const result = await cloudinary.uploader.upload(filePath);
  return result;
}
