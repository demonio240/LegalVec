import { Provider } from '@nestjs/common';
import { VectorizeElementNestCommandHandler } from './CommandHandlers/VectorizeElementNestCommandHandler';
import { VectorizeElementCommandHandler } from '@DocumentProcessing/Vectorizer/Application/VectorizeElementCommandHandler';
import { VectorizeElement } from '@DocumentProcessing/Vectorizer/Application/VectorizeElement';
import { ElementRepository, VECTORIZER_REPOSITORY } from '../Domain/ElementRepository';
import { InMemoryElementRepository } from './Persistence/InMemoryElementRepository';

/**
 * VectorizerProviders
 *
 * Centraliza la definición de todos los providers del feature de Vectorizer.
 * Este array es consumido por el VectorizerModule en apps/.
 *
 * Al crecer las dependencias (repositorios, servicios de IA, etc.), solo
 * este archivo cambia — el módulo raíz permanece limpio e intacto.
 */
export const VectorizerProviders: Provider[] = [
    // 1. Wrapper de Infraestructura: adapta el handler puro al sistema de
    //    NestJS/CQRS. Es el que el CommandBus encuentra y ejecuta.
    VectorizeElementNestCommandHandler,

    // 2. Handler de Aplicación: contiene la lógica de orquestación pura,
    //    sin depender del framework. Se instancia manualmente con useFactory
    //    para mantener el desacoplamiento con NestJS.
    {
        provide: VectorizeElementCommandHandler,
        useFactory: (useCase: VectorizeElement) => {
            return new VectorizeElementCommandHandler(useCase);
        },
        inject: [VectorizeElement],
    },

    // 3. Caso de Uso puro de Aplicación: contiene la lógica de negocio.
    //    En el futuro, aquí se inyectarán repositorios o servicios de IA
    //    como dependencias (ej. useFactory: (repo: IElementRepository) => ...).
    {
        provide: VectorizeElement,
        //useClass: La clase que vaya a implementar
        useFactory: (repository: ElementRepository) => {
            return new VectorizeElement(repository);
        },
        inject: [VECTORIZER_REPOSITORY]
    },

    {
        provide: VECTORIZER_REPOSITORY,

        useFactory: () => {
            return new InMemoryElementRepository()
        }
    },
];
