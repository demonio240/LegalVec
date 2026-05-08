import { VectorizeElementCommand } from './VectorizeElementCommandMother';
import { VectorizerCreatedDomainEventMother } from './VectorizerCreatedDomainEventMother';
import { VectorizeElementCommandHandler } from '@DocumentProcessing/Vectorizer/Application/VectorizeElementCommandHandler';
import { VectorizerModuleUnitTestCase } from '../VectorizerModuleUnitTestCase';
import { VectorizeElement } from '@DocumentProcessing/Vectorizer/Application/VectorizeElement';
import { VectorizeElementCommandMother } from './VectorizeElementCommandMother';
import { ElementMother } from '@DocumentProcessing/Vectorizer/Domain/Element';

describe('VectorizeElementCommandHandlerTest', () => {
    // 1. Definimos las variables en el scope del describe
    let handler: VectorizeElementCommandHandler;
    let unitTestCase: VectorizerModuleUnitTestCase;

    // 2. El equivalente al setUp() de PHP es beforeEach()
    beforeEach(() => {
        // Instanciamos tu clase base (que ya tiene los mocks listos)
        unitTestCase = new VectorizerModuleUnitTestCase();

        // Llamamos a su setup (que internamente hará el super.setUp() si es necesario)
        unitTestCase.setUp();

        // Inicializamos el handler inyectando los mocks que provee la clase base
        const creator = new VectorizeElement(
            unitTestCase.repository(),
            unitTestCase.eventBus()
        );

        handler = new VectorizeElementCommandHandler(creator);
    });

    // 3. El test propiamente dicho
    it('should vectorize a valid element', async () => {
        // GIVEN
        const command = VectorizeElementCommandMother.create();
        const element = ElementMother.create(command);
        //const domainEvent = VectorizerCreatedDomainEventMother.fromElement(element);

        // WHEN (Expectativas/Mocks)
        // Usamos los métodos auxiliares de tu clase base (deben estar definidos allí)
        unitTestCase.shouldSave(element);
        //unitTestCase.shouldPublishDomainEvent(domainEvent);

        // THEN (Acción)
        // En NestJS/TS los handlers suelen ser asíncronos (retornan Promise)
        await handler.execute(command);

        // Si tu clase base tiene el método dispatch como en PHP:
        // await unitTestCase.dispatch(command, handler);
    });
});
