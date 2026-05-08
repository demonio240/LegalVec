import { OptimizedSvg } from "@DocumentProcessing/Vectorizer/Domain/VO/OptimizedSvg";

export class OptimizedSvgMother {
    static create(value?: string): OptimizedSvg {
        return new OptimizedSvg(value ?? '<svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="40" /></svg>');
    }
}
