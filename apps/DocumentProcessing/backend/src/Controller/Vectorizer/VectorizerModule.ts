import { Module } from '@nestjs/common';
import { VectorizeElementPostController } from './VectorizeElementPostController';
import { VectorizerProviders } from '@DocumentProcessing/Vectorizer/Infrastructure/VectorizerProviders';

/**
 * VectorizerModule — Módulo de característica (Feature Module)
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
 * de elementos. Es el único responsable de:
 *  - Registrar el controlador HTTP del Vectorizer.
 *  - Delegar la definición de providers a VectorizerProviders.
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
    controllers: [VectorizeElementPostController],
    providers: [...VectorizerProviders],
})
export class VectorizerModule {}
