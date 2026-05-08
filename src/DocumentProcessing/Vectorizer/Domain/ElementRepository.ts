import { Element } from "./Element";

export const VECTORIZER_REPOSITORY = Symbol('ElementRepository');

export interface ElementRepository {
    save(document: Element): Promise<void>;
}