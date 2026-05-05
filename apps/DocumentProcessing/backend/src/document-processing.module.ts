import { Module } from '@nestjs/common';

@Module({
    imports: [
        // Aquí importaremos el VectorizationEngineModule más adelante
    ],
    controllers: [
        // Aquí pondremos el VectorizeDocumentController
    ],
    providers: [
        // Casos de uso y repositorios inyectados con useFactory
    ],
})
export class DocumentProcessingModule { }