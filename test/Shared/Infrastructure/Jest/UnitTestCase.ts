// TODO: Create src/Shared/Domain/Bus/Event/DomainEvent.ts
// TODO: Create src/Shared/Domain/Bus/Event/EventBus.ts
// TODO: Create src/Shared/Domain/UuidGenerator.ts

import { mock, MockProxy } from 'jest-mock-extended';
import { Command } from '@Shared/Domain/Bus/Command/Command';
import { Query } from '@Shared/Domain/Bus/Query/Query';

// --- Inline interfaces until domain files are created ---

/** Marker interface for all Domain Events */
export interface DomainEvent {
    readonly eventId: string;
    readonly occurredOn: Date;
}

/** Port: EventBus */
export interface EventBus {
    publish(...events: DomainEvent[]): Promise<void>;
}

/** Port: UuidGenerator */
export interface UuidGenerator {
    generate(): string;
}

export abstract class UnitTestCase {

    private _eventBus: MockProxy<EventBus> | null = null;
    private _uuidGenerator: MockProxy<UuidGenerator> | null = null;

    // ---------------------------------------------------------------------------
    // Mock factory
    // ---------------------------------------------------------------------------

    public mock<T>(): MockProxy<T> {
        return mock<T>();
    }

    public setUp(): void {
        // Aquí puedes inicializar mocks comunes a todos los tests si es necesario
        // Por ejemplo: this.eventBusMock = this.mock<EventBus>();
    }

    // ---------------------------------------------------------------------------
    // EventBus lazy mock
    // ---------------------------------------------------------------------------

    public eventBus(): MockProxy<EventBus> {
        if (!this._eventBus) {
            this._eventBus = mock<EventBus>();
        }
        return this._eventBus;
    }

    public shouldPublishDomainEvent(domainEvent: DomainEvent): void {
        this.eventBus().publish.mockResolvedValueOnce(undefined);
        void domainEvent;
    }

    public shouldNotPublishDomainEvent(): void {
        expect(this.eventBus().publish).not.toHaveBeenCalled();
    }

    // ---------------------------------------------------------------------------
    // UuidGenerator lazy mock
    // ---------------------------------------------------------------------------

    public uuidGenerator(): MockProxy<UuidGenerator> {
        if (!this._uuidGenerator) {
            this._uuidGenerator = mock<UuidGenerator>();
        }
        return this._uuidGenerator;
    }

    public shouldGenerateUuid(uuid: string): void {
        this.uuidGenerator().generate.mockReturnValueOnce(uuid);
    }

    // ---------------------------------------------------------------------------
    // Bus helpers
    // ---------------------------------------------------------------------------

    public async notify(
        event: DomainEvent,
        subscriber: (e: DomainEvent) => Promise<void>,
    ): Promise<void> {
        await subscriber(event);
    }

    public async dispatch(
        command: Command,
        handler: (c: Command) => Promise<void>,
    ): Promise<void> {
        await handler(command);
    }

    // ---------------------------------------------------------------------------
    // Query assertions
    // ---------------------------------------------------------------------------

    public async assertAskResponse<R>(
        expected: R,
        query: Query,
        handler: (q: Query) => Promise<R>,
    ): Promise<void> {
        const actual = await handler(query);
        expect(actual).toEqual(expected);
    }

    public async assertAskThrowsException(
        expectedErrorClass: new (...args: unknown[]) => Error,
        query: Query,
        handler: (q: Query) => Promise<unknown>,
    ): Promise<void> {
        await expect(handler(query)).rejects.toThrow(expectedErrorClass);
    }

    // ---------------------------------------------------------------------------
    // Similarity assertions
    // ---------------------------------------------------------------------------

    public assertSimilar(expected: unknown, actual: unknown): void {
        expect(actual).toEqual(expected);
    }

    public isSimilar(expected: unknown, actual: unknown): boolean {
        try {
            expect(actual).toEqual(expected);
            return true;
        } catch {
            return false;
        }
    }
}
