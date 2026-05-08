import { ElementPrecision } from "@DocumentProcessing/Vectorizer/Domain/VO/Precision";
import { MotherCreator } from "test/DocumentProcessing/Shared/MotherCreator";

export class ElementPrecisionMother {
    static create(value?: number): ElementPrecision {
        return new ElementPrecision(value ?? MotherCreator.random().helpers.arrayElement([1, 2]));
    }
}
