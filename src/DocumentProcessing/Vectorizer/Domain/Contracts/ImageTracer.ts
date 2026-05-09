import { Image } from "../VO/Image";
import { ElementScale } from "../VO/Scale";
import { ElementPrecision } from "../VO/Precision";

export const IMAGE_TRACER_ENGINE = Symbol('ImageTracerEngine');

export interface ImageTracerEngine {
    trace(image: Image, scale: ElementScale, precision: ElementPrecision): Promise<string>;
}
