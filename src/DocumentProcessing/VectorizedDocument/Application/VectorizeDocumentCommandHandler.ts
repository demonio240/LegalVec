import { VectorizeDocumentCommand } from "./VectorizeDocumentCommand";
import { VectorizeDocument } from "./VectorizeDocument";

// Fíjate que esto NO tiene ningún import de '@nestjs/cqrs'. Es 100% puro.
export class VectorizeDocumentCommandHandler {
    constructor(private useCase: VectorizeDocument) {}

    async handle(command: VectorizeDocumentCommand): Promise<void> {
        await this.useCase.run(command.documentId, command.text);
    }
}
