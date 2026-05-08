export class ElementId {
    constructor(readonly value: string) {
        if (!value) throw new Error("ElementId cannot be empty");
        // Aquí podrías añadir validación de formato UUID
    }
}