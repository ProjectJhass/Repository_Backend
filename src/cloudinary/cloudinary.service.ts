import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import * as streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
    constructor() {
        // Configuración de Cloudinary
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }

    // Método para subir una imagen a Cloudinary
    async uploadFile(file: Express.Multer.File): Promise<string | UploadApiErrorResponse> {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: 'ImagesUsers' }, // Puedes agregar una carpeta si lo necesitas
                (error: UploadApiErrorResponse, result: UploadApiResponse) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result.secure_url); // Retorna la URL segura de la imagen
                    }
                }
            );
            streamifier.createReadStream(file.buffer).pipe(uploadStream); // Convierte el buffer en un stream
        });
    }
}
