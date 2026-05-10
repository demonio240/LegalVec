import { Element } from "../Domain/Element";
import { ElementId } from "../../Shared/Domain/Vectorizer/ElementId";
import { Image } from "../Domain/VO/Image";
import { ElementScale } from "../Domain/VO/Scale";
import { ElementPrecision } from "../Domain/VO/Precision";
import { ElementRepository } from "../Domain/ElementRepository";
import { VectorizationPipeline } from "../Domain/Pipeline/VectorizationPipeline";

export class VectorizeElement {
    constructor(
        private repository: ElementRepository,
        private pipeline: VectorizationPipeline
    ) { }

    async run(id: ElementId, image: Image, scale: ElementScale, precision: ElementPrecision): Promise<void> {
        // 1. Ejecutamos el pipeline de forma estática
        const result = await this.pipeline.run({ image, scale, precision });

        // 2. Creamos el elemento con los resultados del pipeline
        const element = Element.create(
            id,
            result.image,
            result.scale,
            result.precision,
            result.svg!,
            result.reductionRate!
        );

        // 3. Guardamos
        await this.repository.save(element);
    }
}

