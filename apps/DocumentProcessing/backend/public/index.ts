import { NestFactory } from '@nestjs/core';
import { DocumentProcessingModule } from '../src/document-processing.module';

async function bootstrap() {
    // Le decimos a Nest que levante la app usando nuestro módulo raíz
    const app = await NestFactory.create(DocumentProcessingModule);

    // Asignamos un prefijo opcional para la API
    app.setGlobalPrefix('api');

    const port = 3000;
    await app.listen(port);

    console.log(`🚀 Vectorization Engine (Document Processing) corriendo en: http://localhost:${port}/api`);
}

bootstrap();
