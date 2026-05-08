import { Element } from "@DocumentProcessing/Vectorizer/Domain/Element";

export class ElementMother {
    static create(params?: {
        id?: string;
        rawSvg?: string;
        optimizedSvg?: string;
        reductionRate?: number;
        scale?: number;
    }): Element {
        return Element.create({
            id: params?.id ?? "f47ac10b-58cc-4372-a567-0e02b2c3d479",
            rawSvg: params?.rawSvg ?? "<svg>...</svg>",
            optimizedSvg: params?.optimizedSvg ?? "<svg>optimized</svg>",
            reductionRate: params?.reductionRate ?? 0.5,
            scale: params?.scale ?? 0.5
        });
    }

}