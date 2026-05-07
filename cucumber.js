// LegalVec/cucumber.js

// 1. Importas las configuraciones de cada Bounded Context
const documentProcessingSuites = require('./apps/DocumentProcessing/backend/test/document_processing.cucumber.js');
const subscriptionSuites = require('./apps/Subscription/backend/test/subscription.cucumber.js');

const commonConfig = [
  '--require-module ts-node/register', // Para que Cucumber entienda TypeScript
  '--require-module tsconfig-paths/register', // Para que entienda los path aliases de tsconfig.json
  '--format progress-bar'              // Formato de salida en consola
];

module.exports = {
  // 1. Suite GLOBAL (Corre absolutamente todos los Bounded Contexts)
  default: [
    ...commonConfig,
    // Carga TODAS las features de todos los BCs
    'apps/**/test/features/**/*.feature',             
    // Carga los steps compartidos (ApiContext, etc.)
    '--require test/Shared/Infrastructure/Cucumber/**/*.steps.ts',
    // Carga los setups y steps específicos de CADA BC
    '--require apps/**/test/features/**/*.steps.ts' 
  ].join(' '),

  // 2. Suites descentralizadas por Bounded Context
  // Al usar "..." (spread operator), estamos inyectando todas las suites
  // (como VectorizedDocument, DocumentProcessing_all, etc) directamente aquí
  ...documentProcessingSuites,
  ...subscriptionSuites
};