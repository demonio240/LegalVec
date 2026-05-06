import { NestFactory } from '@nestjs/core';
import { DocumentProcessingModule } from '../src/document-processing.module';

async function bootstrap() {
  // Inicializamos NestJS sin servidor HTTP (Modo consola)
  const app = await NestFactory.createApplicationContext(DocumentProcessingModule);
  
  console.log('🚀 Consola inicializada. Lista para ejecutar comandos.');
  // Aquí podrías agregar lógica para leer process.argv
  // o delegarlo a 'nest-commander' cuando lo instales.

  await app.close();
}

bootstrap();
