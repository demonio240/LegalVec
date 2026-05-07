import { Provider } from '@nestjs/common';
import { VectorizeDocumentNestCommandHandler } from './VectorizeDocumentNestCommandHandler';
import { VectorizeDocumentCommandHandler } from '@DocumentProcessing/VectorizationEngine/Application/VectorizeDocumentCommandHandler';
import { VectorizeDocument } from '@DocumentProcessing/VectorizationEngine/Application/VectorizeDocument';

/**
 * VectorizationEngineProviders
 *
 * Centraliza la definición de todos los providers del feature de VectorizationEngine.
 * Este array es consumido por el VectorizationEngineModule en apps/.
 *
 * Al crecer las dependencias (repositorios, servicios de IA, etc.), solo
 * este archivo cambia — el módulo raíz permanece limpio e intacto.
 */
export const VectorizationEngineProviders: Provider[] = [
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
];
