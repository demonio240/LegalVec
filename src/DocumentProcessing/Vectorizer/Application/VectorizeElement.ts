import { Element } from "../Domain/Element";
import { VectorizerRepository } from "../Domain/ElementRepository";
import { EventBus } from "test/Shared/Infrastructure/Jest/UnitTestCase"; // Nota: Esto luego irá a su sitio en Shared
import { ElementId } from "../Domain/VO/ElementId";
import { Image } from "../Domain/VO/Image";
import { ElementScale } from "../Domain/VO/Scale";
import { ElementPrecision } from "../Domain/VO/Precision";
import { OptimizedSvg } from "../Domain/VO/OptimizedSvg";
import { ReductionRate } from "../Domain/VO/ReductionRate";

export class VectorizeElement {
    constructor(
        private repository: VectorizerRepository,
        private eventBus: EventBus
    ) { }

    async run(id: ElementId, image: Image, scale: ElementScale, precision: ElementPrecision, optimizedSvg: OptimizedSvg, reductionRate: ReductionRate): Promise<void> {
        // 1. Aquí irá la lógica de ImageTracer y Pipeline (próximamente)

        // 2. Por ahora, para que el test compile y pase (TDD), creamos el elemento
        const element = Element.create(
            id,
            image,
            scale,
            precision,
            optimizedSvg,
            reductionRate
        );

        // 3. Guardamos y publicamos
        await this.repository.save(element);
        // await this.eventBus.publish(...);
    }
}
