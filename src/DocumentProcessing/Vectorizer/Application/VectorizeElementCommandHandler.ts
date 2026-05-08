import { VectorizeElementCommand } from "./VectorizeElementCommand";
import { VectorizeElement } from "./VectorizeElement";
import { ElementId } from "../../Shared/Domain/Vectorizer/ElementId";
import { Image } from "../Domain/VO/Image";
import { ElementScale } from "../Domain/VO/Scale";
import { ElementPrecision } from "../Domain/VO/Precision";
import { OptimizedSvg } from "../Domain/VO/OptimizedSvg";
import { ReductionRate } from "../Domain/VO/ReductionRate";

// Fíjate que esto NO tiene ningún import de '@nestjs/cqrs'. Es 100% puro.
export class VectorizeElementCommandHandler {
    constructor(private useCase: VectorizeElement) { }

    async execute(command: VectorizeElementCommand): Promise<void> {
        await this.useCase.run(
            new ElementId(command.elementId),
            new Image(command.image),
            new ElementScale(command.scale),
            new ElementPrecision(command.precision),
            new OptimizedSvg(command.optimizedSvg),
            new ReductionRate(command.reductionRate)
        );
    }
}
