import { Injectable } from '@nestjs/common';
import * as PDFDocument from 'pdfkit';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Profile } from 'src/profile/entities/profile.entity';

@Injectable()
export class PdfService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  async generateAllUsersReport(): Promise<Buffer> {
    // Obtén todos los usuarios desde la base de datos
    const users = await this.userRepository.find();

    if (!users || users.length === 0) {
      throw new Error('No hay usuarios disponibles para el reporte');
    }

    // Genera el documento PDF
    const doc = new PDFDocument();
    const chunks = [];

    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => console.log('PDF creado'));

    doc.fontSize(20).text('Reporte de Usuarios', { align: 'center' });
    doc.moveDown();

    // Añade información de cada usuario al PDF
    users.forEach((user, index) => {
      doc.fontSize(16).text(`Usuario ${index + 1}`, { underline: true });
      doc.fontSize(14).text(`Nombre: ${user.nombre} ${user.apellido}`);
      doc.text(`Correo: ${user.correo}`);
      doc.text(`Teléfono: ${user.telefono}`);
      doc.text(`Edad: ${user.edad}`);

      // if (profile.role) {
      //   doc.text(`Rol: ${profile.role}`);
      // }

      // Puedes obtener el perfil del usuario, si es necesario
      // const profile = await this.profileRepository.findOne({ where: { user: { id_usuario: user.id_usuario } } });

      doc.moveDown();
    });

    doc.end();

    // Devuelve el PDF como Buffer
    return new Promise((resolve, reject) => {
      doc.on('end', () => {
        const result = Buffer.concat(chunks);
        resolve(result);
      });

      doc.on('error', (err) => reject(err));
    });
  }
}
