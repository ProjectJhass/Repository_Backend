import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { CorsMiddleware } from './middlewares/cors.middleware';
import { join } from 'path';
import * as fs  from 'fs';
import * as http from 'http';  // Para manejar HTTP
import * as https from 'https'; // Para manejar HTTPS

async function bootstrap() {

  const httpsOptions = {
    key: fs.readFileSync(join(__dirname, '../secrets/private-key.pem')),
    cert: fs.readFileSync(join(__dirname, '../secrets/public-certificate.pem')),
  };

  // Crear la app de NestJS sin opciones HTTPS (para HTTP)
  const app = await NestFactory.create(AppModule);

  // Establecer prefijo global para las rutas de la API
  app.setGlobalPrefix('api/v1');

  // Configurar pipes de validación globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,           // Ignora propiedades no definidas en el DTO
      forbidNonWhitelisted: true, // Rechaza propiedades no definidas en el DTO
      transform: true,           // Transforma la entrada a los tipos esperados
    }),
  );

  app.use(new CorsMiddleware().use);

  // Configuración de Swagger para documentación de la API
  const config = new DocumentBuilder()
    .setTitle('JHASS')             // Título de la documentación
    .setDescription('Hola')        // Descripción breve
    .setVersion('1.0')             // Versión de la API
    .addTag('JHASS')               // Etiquetas para organización en Swagger
    .addBearerAuth()               // Añadir autenticación Bearer
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentation', app, document);

  // Definir puertos
  const httpPort = process.env.HTTP_PORT || 3000; // HTTP
  const httpsPort = process.env.HTTPS_PORT || 3001; // HTTPS

  // Crear servidor HTTP
  const httpServer = http.createServer(app.getHttpAdapter().getInstance());
  httpServer.listen(httpPort, () => {
    console.log(`Application is running on: http://localhost:${httpPort}`);
  });

  // Crear servidor HTTPS
  const httpsServer = https.createServer(httpsOptions, app.getHttpAdapter().getInstance());
  httpsServer.listen(httpsPort, () => {
    console.log(`Application is running on: https://localhost:${httpsPort}`);
  });
}

bootstrap();
