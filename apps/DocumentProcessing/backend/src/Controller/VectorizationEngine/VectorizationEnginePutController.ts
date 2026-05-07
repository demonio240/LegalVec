import { Controller, Post } from "@nestjs/common";

@Controller('api/vectorization')
export class VectorizeDocumentController {
    @Post()
    async run() {
        // Lógica para procesar y vectorizar
        return { status: "created" }; // Que por defecto devuelve un 201
    }
}
