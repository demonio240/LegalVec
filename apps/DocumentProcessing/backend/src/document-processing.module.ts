import { Module } from '@nestjs/common';
import { SharedInfrastructureModule } from '@Shared/Infrastructure/NestJS/SharedInfrastructureModule';
import { VectorizerModule } from './Controller/Vectorizer/VectorizerModule';

/**
 * DocumentProcessingModule — Módulo Raíz (Root Module)
 *
 * ¿Para qué sirve?
 * ────────────────
 * Este es el punto de entrada de la aplicación NestJS. Su única
 * responsabilidad es ORQUESTAR los módulos de característica (Feature Modules).
 *
 * SharedInfrastructureModule es @Global() — se importa aquí UNA sola vez y todos los
 * feature modules reciben automáticamente CommandBus, QueryBus,
 * ApiExceptionsHttpStatusCodeMapping, y cualquier servicio compartido futuro.
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
        // Infraestructura compartida: CommandBus, QueryBus,
        // ApiExceptionsHttpStatusCodeMapping, y futuros servicios globales.
        SharedInfrastructureModule,

        // Feature Modules:
        VectorizerModule,

        // Aquí irán los futuros módulos de característica, por ejemplo:
        // TextRecognitionModule,
        // DocumentSearchModule,
        // DeleteDocumentModule,
    ],
})
export class DocumentProcessingModule {}