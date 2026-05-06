// test/Shared/Infrastructure/Cucumber/ApiContext.steps.ts
import { Given, Then } from '@cucumber/cucumber';
import * as request from 'supertest';

// Ya NO usamos BeforeAll aquí. Usamos una variable global 
// que será inicializada por el setup específico de cada BC.
export let sharedApp: any; 

export function setSharedApp(app: any) {
  sharedApp = app;
}

Given('I send a {string} request to {string} with body:', function (method, route, bodyString) {
  const server = request(sharedApp.getHttpServer());
  // ... resto de tu código
});
