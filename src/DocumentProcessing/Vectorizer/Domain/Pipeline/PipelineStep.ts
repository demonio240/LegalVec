import { VectorizationContext } from "./VectorizationContext";

export interface PipelineStep {
    execute(context: VectorizationContext): Promise<VectorizationContext>;
}
