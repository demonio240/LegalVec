import { Image } from "@DocumentProcessing/Vectorizer/Domain/VO/Image";
import { MotherCreator } from "test/Shared/Domain/MotherCreator";

export class ImageMother {
    static create(value?: string): Image {
        return new Image(value ?? MotherCreator.random().image.url());
    }
}
