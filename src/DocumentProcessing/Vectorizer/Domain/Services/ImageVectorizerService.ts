import { PipelineStep } from "../Pipeline/PipelineStep";
import { VectorizationContext } from "../Pipeline/VectorizationContext";
import { ImageTracerEngine } from "../Contracts/ImageTracer";
import { OptimizedSvg } from "../VO/OptimizedSvg";

export class ImageVectorizerService implements PipelineStep {
    constructor(private engine: ImageTracerEngine) { }

    async execute(context: VectorizationContext): Promise<VectorizationContext> {
        console.log("Iniciando trazado de imagen (vectorización)...");

        const svgString = await this.engine.trace(
            context.image,
            context.scale,
            context.precision
        );

        context.svg = new OptimizedSvg(svgString);

        return context;
    }
}
