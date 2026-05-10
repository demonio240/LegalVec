import { Image } from "../VO/Image";
import { ElementScale } from "../VO/Scale";
import { ElementPrecision } from "../VO/Precision";
import { OptimizedSvg } from "../VO/OptimizedSvg";
import { ReductionRate } from "../VO/ReductionRate";
import { ElementId } from "@DocumentProcessing/Shared/Domain/Vectorizer/ElementId";

export interface VectorizationContext {
    image: Image;
    scale: ElementScale;
    precision: ElementPrecision;
    svg?: OptimizedSvg;
    reductionRate?: ReductionRate;
}
