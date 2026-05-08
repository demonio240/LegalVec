import { Element } from "@DocumentProcessing/Vectorizer/Domain/Element";

export class ElementMother {
    static create(params?: {
        id?: string;
        image?: string;
        scale?: number;
        precision?: number;
    }): Element {
        return Element.create({
            id: params?.id ?? "f47ac10b-58cc-4372-a567-0e02b2c3d479",
            image: params?.image ?? "base64string",
            scale: params?.scale ?? 1,
            precision: params?.precision ?? 50
        });
    }

}