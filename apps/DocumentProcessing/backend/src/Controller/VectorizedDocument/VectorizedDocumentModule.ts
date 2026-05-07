import { Module } from '@nestjs/common';
import { VectorizeDocumentPostController } from './VectorizeDocumentPostController';
import { VectorizedDocumentProviders } from '@DocumentProcessing/VectorizedDocument/Infrastructure/VectorizedDocumentProviders';

/**
 * VectorizedDocumentModule — Módulo de característica (Feature Module)
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
 *  - Registrar el controlador HTTP del VectorizedDocument.
 *  - Delegar la definición de providers a VectorizedDocumentProviders.
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
    controllers: [VectorizeDocumentPostController],
    providers: [...VectorizedDocumentProviders],
})
export class VectorizedDocumentModule {}
