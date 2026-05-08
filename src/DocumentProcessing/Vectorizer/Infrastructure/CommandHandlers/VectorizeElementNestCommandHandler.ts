import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VectorizeElementCommand } from '@DocumentProcessing/Vectorizer/Application/VectorizeElementCommand';
import { VectorizeElementCommandHandler } from '@DocumentProcessing/Vectorizer/Application/VectorizeElementCommandHandler';

// Esta clase pertenece a la INFRAESTRUCTURA del módulo Vectorizer.
// Es un simple puente (proxy) que conecta el @nestjs/cqrs con tu capa pura de Application.
@CommandHandler(VectorizeElementCommand)
export class VectorizeElementNestCommandHandler implements ICommandHandler<VectorizeElementCommand> {
    constructor(private readonly pureHandler: VectorizeElementCommandHandler) { }

    async execute(command: VectorizeElementCommand): Promise<void> {
        // Le delegamos la ejecución al handler puro de tu dominio
        await this.pureHandler.execute(command);
    }
}
