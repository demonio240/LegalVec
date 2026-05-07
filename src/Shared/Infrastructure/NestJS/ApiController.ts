import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Command } from '@Shared/Domain/Bus/Command/Command';
import { Query } from '@Shared/Domain/Bus/Query/Query';
import { ApiExceptionsHttpStatusCodeMapping } from './ApiExceptionsHttpStatusCodeMapping';

type ExceptionConstructor = new (...args: any[]) => Error;

export abstract class ApiController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
        exceptionHandler: ApiExceptionsHttpStatusCodeMapping,
    ) {
        this.exceptions().forEach(
            ([exceptionClass, httpCode]) =>
                exceptionHandler.register(exceptionClass, httpCode),
        );
    }

    protected abstract exceptions(): Array<[ExceptionConstructor, number]>;

    protected async dispatch(command: Command): Promise<void> {
        await this.commandBus.execute(command);
    }

    protected async ask<R>(query: Query): Promise<R> {
        return this.queryBus.execute(query);
    }
}


