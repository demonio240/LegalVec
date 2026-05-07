import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VectorizeDocumentCommand } from '@DocumentProcessing/VectorizedDocument/Application/VectorizeDocumentCommand';
import { VectorizeDocumentCommandHandler } from '@DocumentProcessing/VectorizedDocument/Application/VectorizeDocumentCommandHandler';

// Esta clase pertenece a la INFRAESTRUCTURA de tu módulo VectorizedDocument.
// Es un simple puente (proxy) que conecta el @nestjs/cqrs con tu capa pura de Application.
@CommandHandler(VectorizeDocumentCommand)
export class VectorizeDocumentNestCommandHandler implements ICommandHandler<VectorizeDocumentCommand> {
    constructor(private readonly pureHandler: VectorizeDocumentCommandHandler) {}

    async execute(command: VectorizeDocumentCommand): Promise<void> {
        // Le delegamos la ejecución al handler puro de tu dominio
        await this.pureHandler.handle(command);
    }
}
