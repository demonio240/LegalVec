// LegalVec/cucumber.js
const commonConfig = [
  '--require-module ts-node/register', // Para que Cucumber entienda TypeScript
  '--format progress-bar'              // Formato de salida en consola
];

module.exports = {
  // 1. Suite GLOBAL (Corre absolutamente todos los Bounded Contexts)
  default: [
    ...commonConfig,
    'apps/**/test/features/**/*.feature',             
    '--require test/Shared/Infrastructure/Cucumber/**/*.steps.ts' 
  ].join(' '),

  // 2. Suite ESPECÍFICA para tu Bounded Context "DocumentProcessing"
  // Solo correrá tests del motor de vectorización
  vectorization_engine: [
    ...commonConfig,

    // 🟢 setup: Levanta el "Kernel" específico para esta app
    '--require apps/DocumentProcessing/backend/test/features/setup.steps.ts',

    // 🟢 paths: Busca solo en la app de documentos
    'apps/DocumentProcessing/backend/test/features/**/*.feature', 
    
    // 🟢 contexts: Tu traductor base global
    '--require test/Shared/Infrastructure/Cucumber/ApiContext.steps.ts', 

    // Si en el futuro necesitas un traductor específico para manipular 
    // variables internas del motor de vectorización (sin tocar la API), iría aquí.
  ].join(' '),

  // 3. Suite ESPECÍFICA para Suscripciones (Para el futuro)
  subscriptions: [
    ...commonConfig,
    'apps/Subscription/backend/test/features/**/*.feature', 
    '--require test/Shared/Infrastructure/Cucumber/ApiContext.steps.ts', 
    '--require apps/Subscription/backend/test/features/setup.steps.ts'
  ].join(' ')
};