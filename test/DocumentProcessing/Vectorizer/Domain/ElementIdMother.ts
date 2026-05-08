import { ElementId } from "@DocumentProcessing/Vectorizer/Domain/VO/ElementId";
import { UuidMother } from "test/Shared/Domain/UuidMother";

export class ElementIdMother {

    static create(params?: { value?: string }): ElementId {
        return new ElementId(params.value ?? UuidMother.create());
    }

}