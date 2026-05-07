import { Controller, Put } from "@nestjs/common";

@Controller('api/vectorization')
export class VectorizeDocumentController {
    @Put()
    async run() {
        // Lógica para procesar y vectorizar
        return { status: "created" }; // Que por defecto devuelve un 201
    }
}
