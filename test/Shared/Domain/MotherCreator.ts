import { faker, Faker } from '@faker-js/faker';

export class MotherCreator {
    private static _faker: Faker | null = null;

    static random(): Faker {
        return (this._faker ??= faker);
    }
}
