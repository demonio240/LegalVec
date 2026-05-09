import { Element } from "@DocumentProcessing/Vectorizer/Domain/Element";
import { ElementRepository } from "@DocumentProcessing/Vectorizer/Domain/ElementRepository";


export class InMemoryElementRepository implements ElementRepository {
    private elements: Element[] = [];

    async save(element: Element): Promise<void> {
        // En una implementación real de memoria podríamos buscar si existe y actualizarlo
        // o simplemente añadirlo al array.
        this.elements.push(element);

        // Opcional: log para ver que está funcionando durante el desarrollo
        console.log(`[InMemoryRepository] Elemento guardado con ID: ${element.id.value()}`);
    }
}
