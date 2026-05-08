import { validate as uuidValidate, v4 as uuidv4 } from 'uuid';

export abstract class Uuid {

    protected constructor(protected readonly _value: string) {
        this.ensureIsValidUuid(_value);
    }

    static random(): string {
        return uuidv4();
    }

    value(): string {
        return this._value;
    }

    equals(other: Uuid): boolean {
        return this.value() === other.value();
    }

    toString(): string {
        return this.value();
    }

    private ensureIsValidUuid(id: string): void {
        if (!uuidValidate(id)) {
            throw new Error(
                `<${this.constructor.name}> does not allow the value <${id}>.`
            );
        }
    }
}
