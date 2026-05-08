import { VectorizeElementCommand } from "../../../../src/DocumentProcessing/Vectorizer/Application/VectorizeElementCommand";

export class VectorizeElementCommandMother {
    static create(params?: {
        elementId?: string;
        image?: string;
        scale?: number;
        precision?: number;
        optimizedSvg?: string;
        reductionRate?: number;
    }): VectorizeElementCommand {
        return new VectorizeElementCommand(
            params?.elementId ?? "f47ac10b-58cc-4372-a567-0e02b2c3d479", // Un UUID de ejemplo
            params?.image ?? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==", // PNG de 1px
            params?.scale ?? 0.5,
            params?.precision ?? 2,
            params?.optimizedSvg ?? "<svg></svg>",
            params?.reductionRate ?? 0.5
        );
    }
}
