import { Controller, Post } from "@nestjs/common";

@Controller('vectorized-documents')
export class VectorizeDocumentController {
    @Post()
    async run() {
        // Lógica para procesar y vectorizar
        return { status: "created" }; // Que por defecto devuelve un 201
    }
}
