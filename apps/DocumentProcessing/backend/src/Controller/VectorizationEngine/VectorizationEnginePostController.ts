import { VectorizeDocumentCommand } from "@DocumentProcessing/VectorizationEngine/Application/VectorizeDocumentCommand";
import { Controller, Post, Body } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";


@Controller('vectorized-documents')
export class VectorizeDocumentPostController {
    constructor(private readonly commandBus: CommandBus) {}

    @Post()
    async run(@Body() body: any) {
        // En un caso real validarías el body, por ahora extraemos los datos básicos
        const command = new VectorizeDocumentCommand(body.documentId, body.text);
        
        // El bus buscará al VectorizeDocumentNestCommandHandler y lo ejecutará
        await this.commandBus.execute(command);
        
        return { status: "created" }; // Que por defecto devuelve un 201
    }
}
