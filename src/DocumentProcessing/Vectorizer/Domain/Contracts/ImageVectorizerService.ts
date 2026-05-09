import { Image } from "../VO/Image";

export const IMAGE_VECTORIZER_ENGINE = Symbol('ImageVectorizerServices');

export interface ImageVectorizerServices {
    preprocess(image: Image): Promise<Image>;
}
