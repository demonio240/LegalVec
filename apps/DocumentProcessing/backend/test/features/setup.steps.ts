import { BeforeAll, AfterAll } from '@cucumber/cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import { DocumentProcessingModule } from '../../src/document-processing.module';
import * as ApiContext from '../../../../../test/Shared/Infrastructure/Cucumber/ApiContext.steps';

BeforeAll(async function () {
  // Aquí le dices a NestJS: "Levanta el Kernel de Document Processing"
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [DocumentProcessingModule], 
  }).compile();

  const app = moduleFixture.createNestApplication();
  app.setGlobalPrefix('api');
  await app.init();
  
  // Le pasamos la app inicializada al ApiContext compartido
  ApiContext.setSharedApp(app); 
});

AfterAll(async function () {
  await ApiContext.sharedApp.close();
});
