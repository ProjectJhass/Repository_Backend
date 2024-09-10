import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';

@Controller('cloudinary')
export class CloudinaryController {
    constructor(private readonly cloudinaryService: CloudinaryService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file')) // Interceptor para procesar archivos
    async uploadImage(@UploadedFile() file: Express.Multer.File): Promise<{ url?: string; error?: string }> {
        try {
            const result = await this.cloudinaryService.uploadFile(file); // Subir archivo a Cloudinary

            // Validar si es un error o una URL
            if (typeof result === 'string') {
                return { url: result }; // Retorna la URL de la imagen
            } else {
                return { error: result.message }; // Retorna el mensaje de error
            }
        } catch (error) {
            throw new Error(`Error uploading file: ${error.message}`);
        }
    }
}
