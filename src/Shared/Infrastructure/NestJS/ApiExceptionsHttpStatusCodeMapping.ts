import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';

type ExceptionConstructor = new (...args: any[]) => Error;

@Injectable()
export class ApiExceptionsHttpStatusCodeMapping {
    private static readonly DEFAULT_STATUS_CODE = 500;

    private readonly exceptions = new Map<ExceptionConstructor, number>([
        [BadRequestException, 400],
        [NotFoundException, 404],
    ]);

    register(exceptionClass: ExceptionConstructor, statusCode: number): void {
        this.exceptions.set(exceptionClass, statusCode);
    }

    statusCodeFor(exceptionClass: ExceptionConstructor): number {
        return (
            this.exceptions.get(exceptionClass) ??
            ApiExceptionsHttpStatusCodeMapping.DEFAULT_STATUS_CODE
        );
    }
}
