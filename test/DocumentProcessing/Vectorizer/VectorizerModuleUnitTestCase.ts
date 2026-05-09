import { MockProxy } from 'jest-mock-extended';
import { UnitTestCase } from "test/Shared/Infrastructure/Jest/UnitTestCase";
import { ElementRepository } from "../../../src/DocumentProcessing/Vectorizer/Domain/ElementRepository";
import { Element } from "@DocumentProcessing/Vectorizer/Domain/Element";
import { ImageTracerEngine, IMAGE_TRACER_ENGINE } from "../../../src/DocumentProcessing/Vectorizer/Domain/Contracts/ImageTracer";
import { SvgOptimizerEngine, SVG_OPTIMIZER_ENGINE } from "../../../src/DocumentProcessing/Vectorizer/Domain/Contracts/SvgOptimizer";
import { VectorizationPipeline } from "../../../src/DocumentProcessing/Vectorizer/Domain/Pipeline/VectorizationPipeline";
import { ImageVectorizerService } from "../../../src/DocumentProcessing/Vectorizer/Domain/Services/ImageVectorizerService";
import { OptmizeSvgService } from "../../../src/DocumentProcessing/Vectorizer/Domain/Services/OptmizeSvgService";

export class VectorizerModuleUnitTestCase extends UnitTestCase {
    private repositoryMock!: MockProxy<ElementRepository>;
    private tracerMock!: MockProxy<ImageTracerEngine>;
    private optimizerMock!: MockProxy<SvgOptimizerEngine>;

    setUp(): void {
        super.setUp();
        this.repositoryMock = this.mock<ElementRepository>();
        this.tracerMock = this.mock<ImageTracerEngine>();
        this.optimizerMock = this.mock<SvgOptimizerEngine>();

        // Configuramos el pipeline con los mocks para los tests
        VectorizationPipeline.configure([
            new ImageVectorizerService(this.tracerMock),
            new OptmizeSvgService(this.optimizerMock)
        ]);
    }

    repository() {
        return this.repositoryMock;
    }

    shouldTrace(svg: string) {
        this.tracerMock.trace.mockResolvedValue(svg);
    }

    shouldOptimize(svg: string, reductionRate: number) {
        this.optimizerMock.optimize.mockResolvedValue({ svg, reductionRate });
    }

    assertLastSavedElementIs(expectedElement: Element): void {
        expect(this.repositoryMock.save).toHaveBeenCalledWith(expectedElement);
    }

    assertNotSave(): void {
    expect(this.repositoryMock.save).not.toHaveBeenCalled();
}
}

