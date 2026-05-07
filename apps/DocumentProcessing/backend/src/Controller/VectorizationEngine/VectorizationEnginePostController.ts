import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiController } from '@Shared/Infrastructure/NestJS/ApiController';
import { VectorizeDocumentCommand } from '@DocumentProcessing/VectorizationEngine/Application/VectorizeDocumentCommand';

@Controller('vectorized-documents')
export class VectorizeDocumentPostController extends ApiController {
    constructor(commandBus: CommandBus, queryBus: QueryBus) {
        super(commandBus, queryBus);
    }

    @Post()
    async run(@Body() body: any) {
        await this.dispatch(new VectorizeDocumentCommand(body.documentId, body.text));
        return { status: 'created' };
    }

    protected exceptions() {
        // Por ahora sin mapeos específicos — agregar aquí cuando existan
        // excepciones de dominio propias:
        // Ejemplo: return [[DocumentNotFoundError, HttpStatus.NOT_FOUND]];
        return [];
    }
}
