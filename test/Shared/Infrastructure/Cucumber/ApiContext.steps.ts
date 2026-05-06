// test/Shared/Infrastructure/Cucumber/ApiContext.steps.ts
import { Given, Then } from '@cucumber/cucumber';
import * as request from 'supertest';

// Ya NO usamos BeforeAll aquí. Usamos una variable global 
// que será inicializada por el setup específico de cada BC.
export let sharedApp: any; 

export function setSharedApp(app: any) {
  sharedApp = app;
}

let lastResponse: request.Response;

Given('I send a {string} request to {string} with body:', async function (method: string, route: string, bodyString: string) {
  const server = request(sharedApp.getHttpServer());
  const body = JSON.parse(bodyString);

  switch (method.toUpperCase()) {
    case 'POST':
      lastResponse = await server.post(route).send(body);
      break;
    case 'PUT':
      lastResponse = await server.put(route).send(body);
      break;
    case 'PATCH':
      lastResponse = await server.patch(route).send(body);
      break;
    default:
      throw new Error(`Unsupported HTTP method: ${method}`);
  }
});

Then('the response status code should be {int}', function (expectedStatus: number) {
  if (lastResponse.status !== expectedStatus) {
    throw new Error(
      `Expected status ${expectedStatus} but got ${lastResponse.status}. Body: ${JSON.stringify(lastResponse.body)}`
    );
  }
});
