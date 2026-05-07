import { Query } from './Query';

export interface QueryBus {
    ask<R>(query: Query): Promise<R>;
}
