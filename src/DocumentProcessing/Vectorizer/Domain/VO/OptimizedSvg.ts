export class OptimizedSvg {
    constructor(readonly value: string) {
        if (!value || !value.includes("<svg")) {
            throw new Error("OptimizedSvg must be a valid SVG string");
        }
    }
}
