import { ElementId } from "@DocumentProcessing/Shared/Domain/Vectorizer/ElementId";
import { UuidMother } from "test/DocumentProcessing/Shared/UuidMother";

export class ElementIdMother {

    static create(params?: { value?: string }): ElementId {
        return new ElementId(params?.value ?? UuidMother.create());
    }

}