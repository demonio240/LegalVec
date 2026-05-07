// apps/DocumentProcessing/backend/test/document_processing.cucumber.js
const commonConfig = [
  '--require-module ts-node/register',
  '--format progress-bar'
];

module.exports = {
  // Equivalente a la suite "courses" o "VectorizationEngine"
  VectorizationEngine: [
    ...commonConfig,
    // paths: [ apps/mooc/backend/tests/features/VectorizationEngine ]
    'apps/DocumentProcessing/backend/test/features/VectorizationEngine/**/*.feature', 
    

    // setup.steps.ts: Levanta el Kernel de Document Processing
    '--require apps/DocumentProcessing/backend/test/features/setup.steps.ts',

    // contexts: (Tus traductores globales y específicos)
    '--require test/Shared/Infrastructure/Cucumber/ApiContext.steps.ts', 
  ].join(' '),

  // Opcional: Una suite que corra TODOS los submódulos de este Bounded Context a la vez
  DocumentProcessing_all: [
    ...commonConfig,
    'apps/DocumentProcessing/backend/test/features/**/*.feature', 
    '--require test/Shared/Infrastructure/Cucumber/**/*.steps.ts', 
    '--require apps/DocumentProcessing/backend/test/features/**/*.steps.ts'
  ].join(' ')
};
