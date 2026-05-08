import { UnitTestCase } from "test/Shared/Infrastructure/Jest/UnitTestCase";
import { VectorizedElement } from "../../../src/DocumentProcessing/Vectorizer/Domain/Element";
import { VectorizerRepository } from "../../../src/DocumentProcessing/Vectorizer/Domain/ElementRepository";
import { mock } from "jest-mock-extended";

export class VectorizerModuleUnitTestCase extends UnitTestCase {
    private repositoryMock: VectorizerRepository;

    setUp(): void {
        super.setUp();
        this.repositoryMock = this.mock<VectorizerRepository>();
    }

    repository() {
        return this.repositoryMock;
    }

    shouldSave(elementVectorized: VectorizedElement) {
        this.repository().save(elementVectorized);
    }


}
