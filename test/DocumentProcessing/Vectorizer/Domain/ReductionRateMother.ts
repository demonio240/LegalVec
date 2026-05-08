import { ReductionRate } from "@DocumentProcessing/Vectorizer/Domain/VO/ReductionRate";
import { MotherCreator } from "test/DocumentProcessing/Shared/MotherCreator";

export class ReductionRateMother {
    static create(value?: number): ReductionRate {
        return new ReductionRate(value ?? MotherCreator.random().number.float({ min: 0, max: 1 }));
    }
}
