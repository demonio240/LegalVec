export class Image {
    constructor(readonly value: string) {
        if (!value || value.trim().length === 0) {
            throw new Error("Image cannot be empty");
        }

        const isBase64 = value.startsWith("data:image/");
        const isUrl = value.startsWith("http://") || value.startsWith("https://");

        if (!isBase64 && !isUrl) {
            throw new Error("Invalid image format. Must be a Data URI or a valid URL");
        }
    }
}
