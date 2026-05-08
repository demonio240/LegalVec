import { VectorizeElementCommand } from "./VectorizeElementCommand";
import { VectorizeElement } from "./VectorizeElement";

// Fíjate que esto NO tiene ningún import de '@nestjs/cqrs'. Es 100% puro.
export class VectorizeElementCommandHandler {
    constructor(private useCase: VectorizeElement) { }

    async execute(command: VectorizeElementCommand): Promise<void> {
        await this.useCase.run(command.documentId, command.text);
    }
}
