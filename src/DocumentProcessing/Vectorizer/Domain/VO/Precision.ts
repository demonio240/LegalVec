export class ElementPrecision {
    constructor(readonly value: number) {
        if (value < 1 || value > 5) {
            throw new Error("Precision must be between 1 and 5");
        }
    }
}
