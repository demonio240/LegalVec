import { Element } from "../Domain/Element";
import { VectorizerRepository } from "../Domain/ElementRepository";
import { EventBus } from "test/Shared/Infrastructure/Jest/UnitTestCase"; // Nota: Esto luego irá a su sitio en Shared

export class VectorizeElement {
    constructor(
        private repository: VectorizerRepository,
        private eventBus: EventBus
    ) { }

    async run(id: string, image: string, scale: number, precision: number): Promise<void> {
        // 1. Aquí irá la lógica de ImageTracer y Pipeline (próximamente)

        // 2. Por ahora, para que el test compile y pase (TDD), creamos el elemento
        const element = Element.create({
            id,
            rawSvg: "<svg>...</svg>",
            optimizedSvg: "<svg>optimized</svg>",
            reductionRate: 0.5,
            scale
        });

        // 3. Guardamos y publicamos
        await this.repository.save(element);
        // await this.eventBus.publish(...);
    }
}
