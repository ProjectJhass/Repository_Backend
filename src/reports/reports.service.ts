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

   // Ajusta el rectángulo del encabezado
doc
.fontSize(14)
.fillColor('white')
.rect(50, 150, 540, 25) // Asegúrate de que el rectángulo esté visible
.fill('#0A84FF')
.stroke();

// Ajusta la posición y el ancho de los textos en el encabezado
doc
.fillColor('white')
.text('Nombre', 60, 157, { width: 120 }) // Coordenada Y fija para 'Nombre'
.text('Apellido', 180, 157, { width: 120 }) // Coordenada Y fija para 'Apellido'
.text('Correo', 300, 157, { width: 180 }) // Coordenada Y fija para 'Correo'
.text('Edad', 480, 157, { width: 40 })    // Coordenada Y fija para 'Edad'
.text('Teléfono', 520, 157, { width: 100 }); // Coordenada Y fija para 'Teléfono'
doc.moveDown(0.2) 
// Elimina cualquier espacio extra después del encabezado


// Añade la información de los usuarios justo debajo del encabezado
users.forEach((user, index) => {
const y = doc.y;

// Alternar colores para las filas
if (index % 2 === 0) {
  doc.rect(50, y, 540, 25).fill('#F0F0F0').stroke();
}
doc
  .fillColor('black')
  .fontSize(12)
  .text(`${user.nombre}`, 60, y + 7, { width: 120, height: 150}) 
  .text(`${user.apellido}`, 180, y + 7, { width: 120, height: 150 }) 
  .text(user.correo, 300, y + 7, { width: 180, height: 150 }) 
  .text(user.edad?.toString() || 'N/A', 480, y + 7, { width: 40, height: 150 }) 
  .text(user.telefono || 'N/A', 520, y + 7, { width: 100, height: 150 });
  doc.moveDown(0.5) 

  // Capturar la altura del contenido más largo (ej. correo)
const contentHeight = Math.max(
  doc.heightOfString(user.nombre, { width: 120 }),
  doc.heightOfString(user.apellido, { width: 120 }),
  doc.heightOfString(user.correo, { width: 180 }),
  25 // El valor mínimo de la altura de la fila
);

// Dibujar línea separadora justo debajo del contenido
doc.moveTo(50, y + contentHeight + 7) // Línea después del contenido
  .lineTo(590, y + contentHeight + 7) // Coordenada de fin de la línea (ancho ajustado a 540)
  .stroke(); 
  

doc.moveDown(0.5); // Reducir el espacio entre las filas
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
