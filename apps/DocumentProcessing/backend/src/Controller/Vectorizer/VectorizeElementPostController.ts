import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiController } from '@Shared/Infrastructure/NestJS/ApiController';
import { ApiExceptionsHttpStatusCodeMapping } from '@Shared/Infrastructure/NestJS/ApiExceptionsHttpStatusCodeMapping';
import { VectorizeElementCommand } from '@DocumentProcessing/Vectorizer/Application/VectorizeElementCommand';

@Controller('vectorized-documents')
export class VectorizeElementPostController extends ApiController {
    constructor(
        commandBus: CommandBus,
        queryBus: QueryBus,
        exceptionHandler: ApiExceptionsHttpStatusCodeMapping,
    ) {
        super(commandBus, queryBus, exceptionHandler);
    }

    //cambiar el nombre de body a request
    @Post()
    async run(@Body() body: any) {
        await this.dispatch(
            new VectorizeElementCommand(
                body.documentId,
                body.imageUrl,
                body.scale,
                body.precision
            )
        );
        return { status: 'created' };
    }

    protected exceptions() {
        // Por ahora sin mapeos específicos — agregar aquí cuando existan
        // excepciones de dominio propias:
        // Ejemplo: return [[ElementNotFoundError, HttpStatus.NOT_FOUND]];
        return [];
    }
}
