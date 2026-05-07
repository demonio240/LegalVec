export class VectorizeDocument {
    // Aquí podrías inyectar un repositorio o servicio de AI puro:
    // constructor(private aiService: AiVectorizationService) {}

    async run(documentId: string, text: string): Promise<void> {
        console.log(`Ejecutando caso de uso puro para documento: ${documentId}`);
        // Lógica de negocio aquí...
    }
}
