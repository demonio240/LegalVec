import { Element } from "@DocumentProcessing/Vectorizer/Domain/Element";
import { ElementId } from "@DocumentProcessing/Vectorizer/Domain/VO/ElementId";
import { Image } from "@DocumentProcessing/Vectorizer/Domain/VO/Image";
import { OptimizedSvg } from "@DocumentProcessing/Vectorizer/Domain/VO/OptimizedSvg";
import { ElementPrecision } from "@DocumentProcessing/Vectorizer/Domain/VO/Precision";
import { ReductionRate } from "@DocumentProcessing/Vectorizer/Domain/VO/ReductionRate";
import { ElementScale } from "@DocumentProcessing/Vectorizer/Domain/VO/Scale";
import { ElementIdMother } from "./ElementIdMother";
import { ImageMother } from "./ImageMother";
import { ElementScaleMother } from "./ElementScaleMother";
import { ElementPrecisionMother } from "./ElementPrecisionMother";
import { OptimizedSvgMother } from "./OptimizedSvgMother";
import { ReductionRateMother } from "./ReductionRateMother";
import { VectorizeElementCommand } from "@DocumentProcessing/Vectorizer/Application/VectorizeElementCommand";

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
            params?.id ?? ElementIdMother.create(),
            params?.image ?? ImageMother.create(),
            params?.scale ?? ElementScaleMother.create(1),
            params?.precision ?? ElementPrecisionMother.create(),
            params?.optimizedSvg ?? OptimizedSvgMother.create(),
            params?.reductionRate ?? ReductionRateMother.create(),
        );
    }
    static fromCommand(command: VectorizeElementCommand): Element {
        return this.create({
            id: ElementIdMother.create({ value: command.getElementId() }),
            image: ImageMother.create(command.getImage()),
            scale: ElementScaleMother.create(command.getScale()),
            precision: ElementPrecisionMother.create(command.getPrecision()),
            optimizedSvg: OptimizedSvgMother.create(command.getOptimizedSvg()),
            reductionRate: ReductionRateMother.create(command.getReductionRate())
        });
    }
}