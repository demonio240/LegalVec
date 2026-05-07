import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VectorizeDocumentController } from './Controller/VectorizationEngine/VectorizationEnginePostController';
import { VectorizeDocumentNestCommandHandler } from '@DocumentProcessing/VectorizationEngine/Infrastructure/VectorizeDocumentNestCommandHandler';
import { VectorizeDocumentCommandHandler } from '@DocumentProcessing/VectorizationEngine/Application/VectorizeDocumentCommandHandler';
import { VectorizeDocument } from '@DocumentProcessing/VectorizationEngine/Application/VectorizeDocument';


@Module({
    imports: [
        CqrsModule
    ],
    controllers: [
        VectorizeDocumentController
    ],
    providers: [
        // 1. El Wrapper de NestJS (Infraestructura)
        VectorizeDocumentNestCommandHandler,

        // 2. El Handler puro (Application) inyectado manualmente
        {
            provide: VectorizeDocumentCommandHandler,
            useFactory: (useCase: VectorizeDocument) => {
                return new VectorizeDocumentCommandHandler(useCase);
            },
            inject: [VectorizeDocument]
        },

        // 3. El Caso de Uso puro (Application) inyectado manualmente
        {
            provide: VectorizeDocument,
            useFactory: () => {
                return new VectorizeDocument(); // En el futuro inyectarás repositorios aquí
            }
        }
    ],
})
export class DocumentProcessingModule { }