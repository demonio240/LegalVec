import { MotherCreator } from "./MotherCreator";

export class UuidMother {

    public static create(): string {
        return MotherCreator.random().string.uuid();

    }

}