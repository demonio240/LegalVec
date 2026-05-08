export class Image {
    constructor(readonly value: string) {
        if (!value || value.trim().length === 0) {
            throw new Error("Image cannot be empty");
        }
    }
}
