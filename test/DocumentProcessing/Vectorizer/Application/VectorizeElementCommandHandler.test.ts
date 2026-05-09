import { VectorizeElementCommandHandler } from '@DocumentProcessing/Vectorizer/Application/VectorizeElementCommandHandler';
import { VectorizerModuleUnitTestCase } from '../VectorizerModuleUnitTestCase';
import { VectorizeElement } from '@DocumentProcessing/Vectorizer/Application/VectorizeElement';
import { ElementMother } from '../Domain/ElementMother';
import { VectorizeElementCommandMother } from './VectorizeElementCommandMother';

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

        // Inicializamos el use case inyectando los mocks que provee la clase base
        const creator = new VectorizeElement(
            unitTestCase.repository(),
            //unitTestCase.eventBus()
        );

        handler = new VectorizeElementCommandHandler(creator);
    });

    // 3. El test propiamente dicho
    it('should vectorize a valid element', async () => {
        // GIVEN
        const command = VectorizeElementCommandMother.create();
        const element = ElementMother.fromCommand(command);

        // WHEN (Acción)
        await handler.execute(command);

        // THEN (Verificación)
        unitTestCase.assertLastSavedElementIs(element);
    });
});
