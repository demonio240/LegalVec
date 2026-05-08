import { VectorizedElement } from "./Element";

export interface VectorizerRepository {
    save(document: VectorizedElement): Promise<void>;
}