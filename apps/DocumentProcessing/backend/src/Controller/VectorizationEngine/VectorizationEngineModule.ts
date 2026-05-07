import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { VectorizeDocumentPostController } from './VectorizationEnginePostController';
import { VectorizationEngineProviders } from '@DocumentProcessing/VectorizationEngine/Infrastructure/VectorizationEngineProviders';
import { ApiExceptionsHttpStatusCodeMapping } from '@Shared/Infrastructure/NestJS/ApiExceptionsHttpStatusCodeMapping';

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
 *  - Delegar la definición de providers a VectorizationEngineProviders.
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
    imports: [CqrsModule],
    controllers: [VectorizeDocumentPostController],
    providers: [...VectorizationEngineProviders, ApiExceptionsHttpStatusCodeMapping],
})
export class VectorizationEngineModule {}

