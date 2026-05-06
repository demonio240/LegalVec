// apps/Subscription/backend/test/subscription.cucumber.js
const commonConfig = [
  '--require-module ts-node/register',
  '--format progress-bar'
];

module.exports = {
  // Equivalente a una suite específica para algún módulo de Suscripciones
  // Ej: PaymentGateway: [ ... ]
  
  // Suite que corre TODOS los submódulos de Suscripciones
  Subscription_all: [
    ...commonConfig,
    // Busca SOLO en la app de suscripciones
    'apps/Subscription/backend/test/features/**/*.feature', 
    // Carga los steps compartidos globales
    '--require test/Shared/Infrastructure/Cucumber/**/*.steps.ts', 
    // Carga SOLO el setup y los steps específicos de esta app
    '--require apps/Subscription/backend/test/features/**/*.steps.ts'
  ].join(' ')
};
