import { PipelineStep } from "./PipelineStep";
import { VectorizationContext } from "./VectorizationContext";

export class VectorizationPipeline {
    private static steps: PipelineStep[] = [];

    constructor(private readonly steps: PipelineStep[]) { }

    async run(context: VectorizationContext): Promise<VectorizationContext> {
        let currentContext = context;
        for (const step of this.steps) {
            currentContext = await step.execute(currentContext);
        }
        return currentContext;
    }
}

