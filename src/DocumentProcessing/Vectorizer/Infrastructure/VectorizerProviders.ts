import { Provider } from '@nestjs/common';
import { VectorizeElementNestCommandHandler } from './CommandHandlers/VectorizeElementNestCommandHandler';
import { VectorizeElementCommandHandler } from '@DocumentProcessing/Vectorizer/Application/VectorizeElementCommandHandler';
import { VectorizeElement } from '@DocumentProcessing/Vectorizer/Application/VectorizeElement';
import { ElementRepository, VECTORIZER_REPOSITORY } from '../Domain/ElementRepository';
import { InMemoryElementRepository } from './Persistence/InMemoryElementRepository';
import { IMAGE_TRACER_ENGINE, ImageTracerEngine } from '../Domain/Contracts/ImageTracer';
import { SVG_OPTIMIZER_ENGINE, SvgOptimizerEngine } from '../Domain/Contracts/SvgOptimizer';
import { ImageVectorizerService } from '../Domain/Services/ImageVectorizerService';
import { OptmizeSvgService } from '../Domain/Services/OptmizeSvgService';
import { VectorizationPipeline } from '../Domain/Pipeline/VectorizationPipeline';

export const VectorizerProviders: Provider[] = [
    VectorizeElementNestCommandHandler,

    {
        provide: VectorizeElementCommandHandler,
        useFactory: (useCase: VectorizeElement) => {
            return new VectorizeElementCommandHandler(useCase);
        },
        inject: [VectorizeElement],
    },

    // Configuración del Pipeline Estático al arrancar
    {
        provide: VectorizationPipeline,
        useFactory: (tracer: ImageTracerEngine, optimizer: SvgOptimizerEngine) => {
            return new VectorizationPipeline([
                new ImageVectorizerService(tracer),
                new OptmizeSvgService(optimizer)
            ]);
        },
        inject: [IMAGE_TRACER_ENGINE, SVG_OPTIMIZER_ENGINE]
    },

    {
        provide: VectorizeElement,
        useFactory: (repository: ElementRepository, pipeline: VectorizationPipeline) => {
            return new VectorizeElement(repository, pipeline); // <- Pasamos el pipeline
        },
        inject: [VECTORIZER_REPOSITORY, VectorizationPipeline]
    },

    {
        provide: VECTORIZER_REPOSITORY,
        useClass: InMemoryElementRepository
    },

    // Motores técnicos (Placeholders por ahora)
    {
        provide: IMAGE_TRACER_ENGINE,
        useValue: { trace: async () => "<svg>...</svg>" }
    },
    {
        provide: SVG_OPTIMIZER_ENGINE,
        useValue: { optimize: async (svg: string) => ({ svg, reductionRate: 0.1 }) }
    }
];
