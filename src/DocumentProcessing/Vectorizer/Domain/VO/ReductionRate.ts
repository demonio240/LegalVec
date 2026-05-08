export class ReductionRate {
    constructor(readonly value: number) {
        if (value < 0 || value > 1) {
            throw new Error("ReductionRate must be between 0 and 1");
        }
    }
}
