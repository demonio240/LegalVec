export class ElementPrecision {
    constructor(readonly value: number) {
        if (value < 1 || value > 2) {
            throw new Error("Precision must be 1 or 2 (Rule #5)");
        }
    }
}
