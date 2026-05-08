export class ElementScale {
    constructor(readonly value: number) {
        if (value <= 0) {
            throw new Error("Scale must be a positive number");
        }
    }
}
