"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadImage = uploadImage;
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
async function uploadImage(filePath) {
    const result = await cloudinary_1.default.uploader.upload(filePath);
    return result;
}
