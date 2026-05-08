import { Uuid } from "@Shared/Domain/ValueObject/Uuid";

export class ElementId extends Uuid {
    constructor(value: string) {
        super(value);
    }
}