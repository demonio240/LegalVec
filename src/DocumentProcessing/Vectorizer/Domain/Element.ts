import { ElementId } from "./VO/ElementId";
import { ElementScale } from "./VO/Scale";
import { ElementPrecision } from "./VO/Precision";
import { Image } from "./VO/Image";
import { OptimizedSvg } from "./VO/OptimizedSvg";
import { ReductionRate } from "./VO/ReductionRate";

export class Element {

    //id: string, image: string, scale: number, precision: number
    constructor(
        public readonly id: ElementId,
        public readonly image: Image,
        public readonly scale: ElementScale,
        public readonly precision: ElementPrecision,
        public readonly optimizedSvg: OptimizedSvg,
        public readonly reductionRate: ReductionRate
    ) { }

    static create(
        id: ElementId,
        image: Image,
        scale: ElementScale,
        precision: ElementPrecision,
        optimizedSvg: OptimizedSvg,
        reductionRate: ReductionRate
    ): Element {
        return new Element(
            id,
            image,
            scale,
            precision,
            optimizedSvg,
            reductionRate
        );
    }


}