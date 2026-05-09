import { Utils } from '../../Utils';
import { SimpleUuid } from '../../ValueObject/SimpleUuid';

export abstract class DomainEvent {
  private readonly _aggregateId: string;
  private readonly _eventId: string;
  private readonly _occurredOn: string;

  constructor(
    aggregateId: string,
    eventId?: string,
    occurredOn?: string
  ) {
    this._aggregateId = aggregateId;
    this._eventId = eventId || SimpleUuid.random();
    this._occurredOn = occurredOn || Utils.dateToString(new Date());
  }

  // En TS no existe 'abstract static', pero las clases hijas DEBEN implementar:
  //   static fromPrimitives(aggregateId: string, body: any, eventId: string, occurredOn: string): DomainEvent
  //   static eventName(): string

  abstract toPrimitives(): any;

  public aggregateId(): string {
    return this._aggregateId;
  }

  public eventId(): string {
    return this._eventId;
  }

  public occurredOn(): string {
    return this._occurredOn;
  }
}
