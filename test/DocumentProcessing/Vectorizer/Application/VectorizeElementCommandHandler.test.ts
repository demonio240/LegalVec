import { VectorizeElementCommandHandler } from '@DocumentProcessing/Vectorizer/Application/VectorizeElementCommandHandler';
import { VectorizerModuleUnitTestCase } from '../VectorizerModuleUnitTestCase';
import { VectorizeElement } from '@DocumentProcessing/Vectorizer/Application/VectorizeElement';
import { ElementMother } from '../Domain/ElementMother';
import { VectorizeElementCommandMother } from './VectorizeElementCommandMother';
import { ImageMother } from '../Domain/ImageMother';
import { ElementScaleMother } from '../Domain/ElementScaleMother';
import { ElementPrecisionMother } from '../Domain/ElementPrecisionMother';
import { OptimizedSvgMother } from '../Domain/OptimizedSvgMother';
import { ReductionRateMother } from '../Domain/ReductionRateMother';

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
            unitTestCase.pipeline()
        );

        handler = new VectorizeElementCommandHandler(creator);
    });

    // 3. El test propiamente dicho
    it('should vectorize and save an element', async () => {
        // GIVEN
        const command = VectorizeElementCommandMother.create();
        const expectedSvg = "<svg>...</svg>";
        const expectedReduction = 0.1;

        // Configuramos el comportamiento del pipeline
        unitTestCase.shouldRunPipeline({
            image: ImageMother.create(command.image),
            scale: ElementScaleMother.create(command.scale),
            precision: ElementPrecisionMother.create(command.precision),
            svg: OptimizedSvgMother.create(expectedSvg),
            reductionRate: ReductionRateMother.create(expectedReduction)
        });

        // Creamos el elemento esperado combinando los datos del comando + los resultados esperados
        const element = ElementMother.fromCommand(command, {
            optimizedSvg: expectedSvg,
            reductionRate: expectedReduction
        });

        // WHEN (Acción)
        await handler.execute(command);

        // THEN (Verificación)
        unitTestCase.assertLastSavedElementIs(element);
    });

   /* it('should throw an exception when scale is invalid', async () => {
        // GIVEN
        const invalidScale = -1; // Supongamos que no permitimos escalas negativas
        const command = VectorizeElementCommandMother.create({ scale: invalidScale });

        // WHEN (Acción) & THEN (Verificación del error)
        // Usamos unitTestCase.assertAskThrowsException o el expect de Jest directamente
        await expect(handler.execute(command)).rejects.toThrow("Scale must be a positive number");

        // ADEMÁS: Verificamos que NUNCA se llamó al repositorio (muy importante)
        unitTestCase.assertNotSave();

    })*/

    /*it('should throw an exception when precision is out of range', async () => {
        // GIVEN (Precisión 10 está fuera del rango 1-5)
        const command = VectorizeElementCommandMother.create({ precision: 10 });

        // WHEN & THEN
        await expect(handler.execute(command))
            .rejects
            .toThrow("Precision must be between 1 and 5");

        unitTestCase.assertNotSave();
    });*/

    /*it('should throw an exception when image is empty', async () => {
        // GIVEN
        const command = VectorizeElementCommandMother.create({ image: "" });

        // WHEN & THEN
        await expect(handler.execute(command))
            .rejects
            .toThrow("Image cannot be empty");

        unitTestCase.assertNotSave();
    });*/

    /*it('should throw an exception when image format is invalid', async () => {
        // GIVEN
        const command = VectorizeElementCommandMother.create({ image: "invalid_format" });

        // WHEN & THEN
        await expect(handler.execute(command))
            .rejects
            .toThrow("Invalid image format. Must be a Data URI or a valid URL");

        unitTestCase.assertNotSave();
    });*/


});

