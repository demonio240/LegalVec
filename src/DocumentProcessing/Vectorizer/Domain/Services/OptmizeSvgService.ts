import { PipelineStep } from "../Pipeline/PipelineStep";
import { VectorizationContext } from "../Pipeline/VectorizationContext";
import { SvgOptimizerEngine } from "../Contracts/SvgOptimizer";
import { ReductionRate } from "../VO/ReductionRate";
import { OptimizedSvg } from "../VO/OptimizedSvg";

export class OptmizeSvgService implements PipelineStep {
    constructor(private engine: SvgOptimizerEngine) { }

    async execute(context: VectorizationContext): Promise<VectorizationContext> {
        if (!context.svg) {
            return context;
        }

        console.log("Optimizando el SVG generado...");

        const { svg, reductionRate } = await this.engine.optimize(context.svg.value);

        context.svg = new OptimizedSvg(svg);
        context.reductionRate = new ReductionRate(reductionRate);

        return context;
    }
}
