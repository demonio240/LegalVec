import { Module } from '@nestjs/common';
import { VectorizeDocumentController } from './Controller/VectorizationEngine/VectorizationEnginePutController';

@Module({
    imports: [
        // Aquí importaremos el VectorizationEngineModule más adelante
    ],
    controllers: [
        VectorizeDocumentController
    ],
    providers: [
        // Casos de uso y repositorios inyectados con useFactory
    ],
})
export class DocumentProcessingModule { }