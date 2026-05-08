import { Element } from "@DocumentProcessing/Vectorizer/Domain/Element";
import { ElementId } from "@DocumentProcessing/Vectorizer/Domain/VO/ElementId";
import { Image } from "@DocumentProcessing/Vectorizer/Domain/VO/Image";
import { OptimizedSvg } from "@DocumentProcessing/Vectorizer/Domain/VO/OptimizedSvg";
import { ElementPrecision } from "@DocumentProcessing/Vectorizer/Domain/VO/Precision";
import { ReductionRate } from "@DocumentProcessing/Vectorizer/Domain/VO/ReductionRate";
import { ElementScale } from "@DocumentProcessing/Vectorizer/Domain/VO/Scale";

export class ElementMother {

    static create(params?: {
        id?: ElementId;
        image?: Image;
        scale?: ElementScale;
        precision?: ElementPrecision;
        optimizedSvg?: OptimizedSvg;
        reductionRate?: ReductionRate;
    }): Element {
        return Element.create(
            params?.id ?? new ElementId("f47ac10b-58cc-4372-a567-0e02b2c3d479"),
            params?.image ?? new Image("base64string"),
            params?.scale ?? new ElementScale(1),
            params?.precision ?? new ElementPrecision(50),
            params?.optimizedSvg ?? new OptimizedSvg("<svg></svg>"),
            params?.reductionRate ?? new ReductionRate(0.5)
        );
    }

}