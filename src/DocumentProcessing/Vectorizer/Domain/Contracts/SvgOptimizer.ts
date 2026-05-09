export const SVG_OPTIMIZER_ENGINE = Symbol('SvgOptimizerEngine');

export interface SvgOptimizerEngine {
    optimize(svg: string): Promise<{ svg: string, reductionRate: number }>;
}
