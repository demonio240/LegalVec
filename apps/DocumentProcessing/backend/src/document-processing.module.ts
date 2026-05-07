import { Module } from '@nestjs/common';
import { VectorizationEngineModule } from './Controller/VectorizationEngine/VectorizationEngineModule';

/**
 * DocumentProcessingModule — Módulo Raíz (Root Module)
 *
 * ¿Para qué sirve?
 * ────────────────
 * Este es el punto de entrada de la aplicación NestJS. Su única
 * responsabilidad es ORQUESTAR los módulos de característica (Feature Modules).
 *
 * Regla de oro: este archivo NUNCA debe registrar controladores ni providers
 * directamente. Cada nueva funcionalidad debe vivir en su propio Feature Module.
 *
 * ¿Cómo añadir una nueva funcionalidad?
 * ──────────────────────────────────────
 * 1. Crea un nuevo Feature Module (ej. TextRecognitionModule).
 * 2. Impórtalo aquí en el array `imports`.
 * 3. ¡Listo! Este archivo no necesita ningún otro cambio.
 */
@Module({
    imports: [
        // Encapsula todo lo relacionado con la vectorización de documentos:
        // controlador HTTP, CommandHandler, y el caso de uso VectorizeDocument.
        VectorizationEngineModule,

        // Aquí irán los futuros módulos de característica, por ejemplo:
        // TextRecognitionModule,
        // DocumentSearchModule,
        // DeleteDocumentModule,
    ],
})
export class DocumentProcessingModule {}