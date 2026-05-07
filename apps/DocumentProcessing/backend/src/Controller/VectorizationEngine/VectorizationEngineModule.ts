import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VectorizeDocumentController } from './VectorizationEnginePostController';
import { VectorizeDocumentNestCommandHandler } from '@DocumentProcessing/VectorizationEngine/Infrastructure/VectorizeDocumentNestCommandHandler';
import { VectorizeDocumentCommandHandler } from '@DocumentProcessing/VectorizationEngine/Application/VectorizeDocumentCommandHandler';
import { VectorizeDocument } from '@DocumentProcessing/VectorizationEngine/Application/VectorizeDocument';

/**
 * VectorizationEngineModule — Módulo de característica (Feature Module)
 *
 * ¿Por qué existe este archivo?
 * ─────────────────────────────
 * El módulo raíz `DocumentProcessingModule` estaba acumulando directamente
 * todos los controladores y providers de cada caso de uso. Esto lo convertía
 * en un "God Module": un archivo que lo sabe y lo hace todo, volviéndose
 * imposible de mantener a medida que el sistema crece.
 *
 * ¿Para qué sirve?
 * ────────────────
 * Este módulo encapsula TODO lo relacionado con el caso de uso de vectorización
 * de documentos. Es el único responsable de:
 *  - Registrar el controlador HTTP de la VectorizationEngine.
 *  - Registrar los providers de Application e Infraestructura asociados.
 *
 * Siguiendo este patrón, añadir un nuevo caso de uso (ej. TextRecognition,
 * DeleteDocument) solo requiere crear un nuevo módulo de característica similar
 * a este e importarlo en `DocumentProcessingModule`. El módulo raíz NUNCA
 * necesita ser modificado para agregar nuevas funcionalidades.
 *
 * Referencia de arquitectura: NestJS Feature Modules
 * https://docs.nestjs.com/modules#feature-modules
 */
@Module({
    imports: [
        // CqrsModule habilita el CommandBus, QueryBus y EventBus de NestJS
        // necesarios para el patrón CQRS dentro de este módulo.
        CqrsModule,
    ],
    controllers: [
        // Controlador HTTP que expone el endpoint POST /vectorized-documents
        VectorizeDocumentController,
    ],
    providers: [
        // 1. Wrapper de Infraestructura: adapta el handler puro al sistema de
        //    NestJS/CQRS. Es el que el CommandBus encuentra y ejecuta.
        VectorizeDocumentNestCommandHandler,

        // 2. Handler de Aplicación: contiene la lógica de orquestación pura,
        //    sin depender del framework. Se instancia manualmente con useFactory
        //    para mantener el desacoplamiento con NestJS.
        {
            provide: VectorizeDocumentCommandHandler,
            useFactory: (useCase: VectorizeDocument) => {
                return new VectorizeDocumentCommandHandler(useCase);
            },
            inject: [VectorizeDocument],
        },

        // 3. Caso de Uso puro de Aplicación: contiene la lógica de negocio.
        //    En el futuro, aquí se inyectarán repositorios o servicios de IA
        //    como dependencias (ej. useFactory: (repo: IDocumentRepository) => ...).
        {
            provide: VectorizeDocument,
            useFactory: () => {
                return new VectorizeDocument();
            },
        },
    ],
})
export class VectorizationEngineModule {}
