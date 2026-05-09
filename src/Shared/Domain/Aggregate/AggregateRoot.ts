import { DomainEvent } from '../Bus/Event/DomainEvent';

export abstract class AggregateRoot {
  private domainEvents: Array<DomainEvent> = [];

  public pullDomainEvents(): Array<DomainEvent> {
    const domainEvents = this.domainEvents;
    this.domainEvents = [];

    return domainEvents;
  }

  protected record(domainEvent: DomainEvent): void {
    this.domainEvents.push(domainEvent);
  }
}
