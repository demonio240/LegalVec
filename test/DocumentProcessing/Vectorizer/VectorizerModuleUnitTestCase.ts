import { UnitTestCase } from "test/Shared/Infrastructure/Jest/UnitTestCase";
import { ElementRepository } from "../../../src/DocumentProcessing/Vectorizer/Domain/ElementRepository";
import { mock } from "jest-mock-extended";
import { Element } from "@DocumentProcessing/Vectorizer/Domain/Element";

export class VectorizerModuleUnitTestCase extends UnitTestCase {
    private repositoryMock!: ElementRepository;

    setUp(): void {
        super.setUp();
        this.repositoryMock = this.mock<ElementRepository>();
    }

    repository() {
        return this.repositoryMock;
    }

    assertLastSavedElementIs(expectedElement: Element): void {
        expect(this.repositoryMock.save).toHaveBeenCalledWith(expectedElement);
    }


}
