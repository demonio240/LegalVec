import { MotherCreator } from "../../DocumentProcessing/Shared/MotherCreator";

export class UuidMother {

    public static create(): string {
        return MotherCreator.random().string.uuid();

    }

}