import { ElementScale } from "@DocumentProcessing/Vectorizer/Domain/VO/Scale";
import { MotherCreator } from "test/Shared/Domain/MotherCreator";

export class ElementScaleMother {
    static create(value?: number): ElementScale {
        return new ElementScale(value ?? MotherCreator.random().number.float({ min: 0.1, max: 10 }));
    }
}
