# LegalVec

Sistema de procesamiento inteligente de documentos legales construido con **NestJS**, siguiendo los principios de **Domain-Driven Design (DDD)**, **CQRS** y **Arquitectura Hexagonal**.

## Tabla de Contenidos

- [Arquitectura](#arquitectura)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Capas de la Arquitectura](#capas-de-la-arquitectura)
- [Bounded Contexts](#bounded-contexts)
- [Shared Kernel](#shared-kernel)
- [Inyección de Dependencias y Flexibilidad](#inyección-de-dependencias-y-flexibilidad)
- [Testing](#testing)
- [Cómo Agregar Funcionalidades](#cómo-agregar-funcionalidades)
- [Comandos](#comandos)

---

## Arquitectura

El proyecto sigue una arquitectura inspirada en el [php-ddd-example](https://github.com/CodelyTV/php-ddd-example) de CodelyTV, adaptada al ecosistema NestJS/TypeScript.

### Principios fundamentales

| Principio | Descripción |
|---|---|
| **DDD** | El código se organiza por Bounded Contexts, no por tipo de archivo |
| **CQRS** | Separación explícita entre Commands (escritura) y Queries (lectura) |
| **Arquitectura Hexagonal** | El dominio no conoce la infraestructura — las dependencias apuntan hacia adentro |
| **Outside-In TDD** | Los tests de aceptación (BDD) guían el desarrollo |

### Diagrama de alto nivel

```
┌─────────────────────────────────────────────────────────────┐
│                          apps/                              │
│  Punto de entrada: controllers, módulos NestJS, CLI         │
│  (Infraestructura de delivery — depende de todo lo demás)   │
├─────────────────────────────────────────────────────────────┤
│                          src/                               │
│  Lógica de negocio pura: Domain, Application, Infra         │
│  (Independiente del framework)                              │
├─────────────────────────────────────────────────────────────┤
│                         test/                               │
│  Tests de aceptación (BDD/Cucumber), step definitions       │
└─────────────────────────────────────────────────────────────┘
```

---

## Estructura del Proyecto

```
LegalVec/
│
├── apps/                                    # Aplicaciones (puntos de entrada)
│   ├── DocumentProcessing/
│   │   └── backend/
│   │       ├── src/
│   │       │   ├── document-processing.module.ts    # Módulo raíz (orquestador)
│   │       │   ├── Controller/
│   │       │   │   └── VectorizationEngine/
│   │       │   │       ├── VectorizationEngineModule.ts        # Feature Module
│   │       │   │       └── VectorizationEnginePostController.ts
│   │       │   └── Command/                 # Comandos CLI (futuro)
│   │       └── test/
│   │           └── features/                # Archivos .feature (Gherkin)
│   └── Subscription/                        # Otro BC (futuro)
│
├── src/                                     # Código de negocio (framework-agnostic)
│   ├── DocumentProcessing/                  # Bounded Context
│   │   └── VectorizationEngine/             # Módulo/Aggregate
│   │       ├── Application/                 # Casos de uso + Command Handlers
│   │       ├── Domain/                      # Entidades, Value Objects, interfaces
│   │       └── Infrastructure/              # Implementaciones concretas + Providers
│   │
│   ├── Shared/                              # Shared Kernel
│   │   ├── Domain/
│   │   │   └── Bus/
│   │   │       ├── Command/                 # Command, CommandBus (interfaces)
│   │   │       └── Query/                   # Query, QueryBus (interfaces)
│   │   └── Infrastructure/
│   │       └── NestJS/                      # Infraestructura NestJS compartida
│   │           ├── SharedModule.ts                          # @Global() module
│   │           ├── ApiController.ts                         # Base controller
│   │           └── ApiExceptionsHttpStatusCodeMapping.ts     # Exception → HTTP code
│   │
│   └── Subscription/                        # Otro BC (futuro)
│
├── test/                                    # Tests compartidos
│   └── Shared/
│       └── Infrastructure/
│           └── Cucumber/
│               └── ApiContext.steps.ts       # Step definitions reutilizables
│
├── cucumber.js                              # Configuración de perfiles Cucumber
├── nest-cli.json                            # Configuración multi-app NestJS
├── tsconfig.json                            # Path aliases (@Shared, @DocumentProcessing)
└── package.json
```

---

## Capas de la Arquitectura

Cada módulo dentro de un Bounded Context se organiza en tres capas:

### Domain (Dominio)

El corazón del negocio. **No depende de nada externo** — ni del framework, ni de librerías, ni de base de datos.

Contiene:
- Entidades y Aggregates
- Value Objects
- Interfaces de repositorios y servicios
- Eventos de dominio
- Errores de dominio

```typescript
// src/DocumentProcessing/VectorizationEngine/Domain/
// Ejemplo: interfaces puras, sin decoradores de NestJS
export interface DocumentRepository {
    save(document: Document): Promise<void>;
    search(id: DocumentId): Promise<Document | null>;
}
```

### Application (Aplicación)

Orquesta los casos de uso. Recibe Commands/Queries y coordina el dominio.

Contiene:
- Commands y Queries (DTOs inmutables)
- Command Handlers y Query Handlers
- Casos de uso (Use Cases)

```typescript
// src/DocumentProcessing/VectorizationEngine/Application/
export class VectorizeDocumentCommandHandler {
    constructor(private readonly useCase: VectorizeDocument) {}

    async handle(command: VectorizeDocumentCommand): Promise<void> {
        await this.useCase.run(command.documentId, command.text);
    }
}
```

### Infrastructure (Infraestructura)

Implementaciones concretas que conectan el dominio con el mundo exterior.

Contiene:
- Adaptadores NestJS (NestCommandHandlers)
- Providers para inyección de dependencias
- Implementaciones de repositorios (TypeORM, Prisma, etc.)
- Clientes HTTP, colas de mensajes, etc.

```typescript
// src/DocumentProcessing/VectorizationEngine/Infrastructure/
export const VectorizationEngineProviders: Provider[] = [
    VectorizeDocumentNestCommandHandler,
    {
        provide: VectorizeDocumentCommandHandler,
        useFactory: (useCase: VectorizeDocument) =>
            new VectorizeDocumentCommandHandler(useCase),
        inject: [VectorizeDocument],
    },
    // ...
];
```

---

## Bounded Contexts

### `apps/` vs `src/` — La separación clave

| Directorio | Responsabilidad | Depende de NestJS |
|---|---|---|
| `src/` | Lógica de negocio pura (Domain + Application + Infrastructure) | Solo en Infrastructure |
| `apps/` | Punto de entrada HTTP, CLI, configuración de módulos NestJS | Sí, completamente |

**¿Por qué esta separación?** Si mañana quisieras migrar de NestJS a otro framework (Fastify puro, Express, etc.), solo reescribirías `apps/` — el código en `src/` permanecería intacto.

### Flujo de una petición HTTP

```
1. POST /vectorized-documents
       │
2. VectorizationEnginePostController (apps/)
       │ extends ApiController
       │ llama this.dispatch(command)
       │
3. CommandBus.execute(command)
       │ (provisto por CqrsModule vía SharedInfrastructureModule)
       │
4. VectorizeDocumentNestCommandHandler (src/Infrastructure)
       │ wrapper NestJS → delega al handler puro
       │
5. VectorizeDocumentCommandHandler (src/Application)
       │ handler puro, sin NestJS
       │
6. VectorizeDocument (src/Application)
       │ caso de uso puro
       │
7. Domain (src/Domain)
```

---

## Shared Kernel

### `src/Shared/` — Código compartido entre Bounded Contexts

#### Domain (`src/Shared/Domain/`)

Interfaces y contratos puros que todos los BCs pueden usar:

```
Shared/Domain/
└── Bus/
    ├── Command/
    │   ├── Command.ts          # Interfaz base para Commands
    │   └── CommandBus.ts       # Interfaz del bus de comandos (no implementación)
    └── Query/
        ├── Query.ts            # Interfaz base para Queries
        └── QueryBus.ts         # Interfaz del bus de queries
```

> **Regla:** Nada en `Shared/Domain/` debe importar NestJS ni ningún framework. Son interfaces y clases puras de TypeScript.

#### Infrastructure (`src/Shared/Infrastructure/NestJS/`)

Implementaciones que dependen de NestJS, compartidas entre todos los BCs:

| Archivo | Propósito |
|---|---|
| `SharedModule.ts` | Módulo `@Global()` que registra servicios compartidos — equivalente al Kernel de Symfony |
| `ApiController.ts` | Clase base abstracta para controllers HTTP con `dispatch()` y `ask()` |
| `ApiExceptionsHttpStatusCodeMapping.ts` | Mapea excepciones de dominio a códigos HTTP |

### `SharedInfrastructureModule` — El corazón del DI

```typescript
@Global()
@Module({
    imports: [CqrsModule],
    providers: [ApiExceptionsHttpStatusCodeMapping],
    exports: [CqrsModule, ApiExceptionsHttpStatusCodeMapping],
})
export class SharedInfrastructureModule {}
```

Se importa **una sola vez** en el módulo raíz (`DocumentProcessingModule`), y todos los feature modules reciben automáticamente:
- `CommandBus` y `QueryBus` (via `CqrsModule`)
- `ApiExceptionsHttpStatusCodeMapping`
- Cualquier servicio compartido que se agregue en el futuro

---

## Inyección de Dependencias y Flexibilidad

### El patrón `provide` / `useClass`

Al igual que en Symfony con `services.yaml`, NestJS permite vincular una interfaz a una implementación concreta. Cambiar la implementación requiere modificar **una sola línea**:

```typescript
// Desarrollo: Logger en consola
{ provide: 'Logger', useClass: ConsoleLogger }

// Producción: cambiar a Winston (solo esta línea cambia)
{ provide: 'Logger', useClass: WinstonLogger }
```

El consumidor nunca cambia:

```typescript
constructor(@Inject('Logger') private readonly logger: Logger) {}
```

### ¿Qué va en el módulo y qué no?

| Tipo de archivo | ¿Se registra como provider? | Ejemplo |
|---|---|---|
| Interfaces de Domain | ❌ No — se importan directamente | `CommandBus`, `Query` |
| Value Objects | ❌ No — se instancian con `new` | `Uuid`, `Email` |
| Clases abstractas | ❌ No — se usan por herencia | `ApiController` |
| Errores de dominio | ❌ No — se lanzan con `throw` | `DocumentNotFound` |
| Servicios `@Injectable()` | ✅ Sí | `ApiExceptionsHttpStatusCodeMapping` |
| Implementaciones de interfaces | ✅ Sí, con `useClass` | `WinstonLogger` |

> **Resultado práctico:** Aunque `Shared/` crezca a 50+ archivos, el módulo solo tendrá ~6-10 líneas de providers.

---

## Testing

### Estrategia: Outside-In TDD con Cucumber (BDD)

Los tests de aceptación guían el desarrollo. Se escriben en Gherkin y verifican el comportamiento completo del sistema.

```gherkin
# apps/DocumentProcessing/backend/test/features/VectorizationEngine/vectorize_document.feature
Feature: Vectorize Document

  Scenario: Vectorize a valid document image
    Given I send a "POST" request to "/api/vectorized-documents" with body:
      """
      {
        "documentId": "123e4567-e89b-12d3-a456-426614174000",
        "imageUrl": "https://bucket.legalvec.com/docs/contract_1.jpg",
        "level": "high_fidelity"
      }
      """
    Then the response status code should be 201
```

### Estructura de tests

```
test/
└── Shared/Infrastructure/Cucumber/
    └── ApiContext.steps.ts          # Steps genéricos reutilizables (Given/Then HTTP)

apps/DocumentProcessing/backend/test/
├── features/
│   ├── VectorizationEngine/
│   │   └── vectorize_document.feature
│   └── setup.steps.ts              # BeforeAll: levanta la app NestJS para testing
└── document_processing.cucumber.js # Configuración del perfil Cucumber
```

---

## Cómo Agregar Funcionalidades

### 1. Nuevo Caso de Uso en un BC existente

Ejemplo: agregar `TextRecognition` al BC `DocumentProcessing`.

```bash
# 1. Crear las capas en src/
src/DocumentProcessing/TextRecognition/
├── Application/
│   ├── RecognizeText.ts                    # Caso de uso
│   ├── RecognizeTextCommand.ts             # Command DTO
│   └── RecognizeTextCommandHandler.ts      # Handler puro
├── Domain/
│   └── ...                                 # Entidades, interfaces
└── Infrastructure/
    ├── RecognizeTextNestCommandHandler.ts   # Wrapper NestJS
    └── TextRecognitionProviders.ts          # Providers del módulo

# 2. Crear el Feature Module en apps/
apps/DocumentProcessing/backend/src/Controller/TextRecognition/
├── TextRecognitionModule.ts                # Feature Module
└── TextRecognitionPostController.ts        # Controller HTTP

# 3. Importar en el módulo raíz
# apps/DocumentProcessing/backend/src/document-processing.module.ts
imports: [
    SharedInfrastructureModule,
    VectorizationEngineModule,
    TextRecognitionModule,          // ← solo agregar esta línea
]
```

### 2. Nuevo Servicio Compartido

Ejemplo: agregar un `Logger` disponible para todos los BCs.

```bash
# 1. Crear la interfaz en Domain
src/Shared/Domain/Logger.ts

# 2. Crear la implementación en Infrastructure
src/Shared/Infrastructure/WinstonLogger.ts

# 3. Registrar en SharedInfrastructureModule
providers: [
    ApiExceptionsHttpStatusCodeMapping,
    { provide: 'Logger', useClass: WinstonLogger },   // ← agregar
],
exports: [
    CqrsModule,
    ApiExceptionsHttpStatusCodeMapping,
    'Logger',                                          // ← exportar
],
```

### 3. Nuevo Bounded Context

```bash
# 1. Crear en src/
src/Subscription/
├── Plans/
│   ├── Application/
│   ├── Domain/
│   └── Infrastructure/

# 2. Crear la app
apps/Subscription/backend/
├── src/
│   ├── subscription.module.ts    # Módulo raíz del BC
│   └── Controller/
└── test/
```

---

## Comandos

```bash
# Ejecutar tests BDD (todos)
npm run test:bdd

# Ejecutar tests BDD solo de VectorizationEngine
npm run test:bdd:docs

# Iniciar servidor de desarrollo
npm run start:doc-engine

# Ejecutar comando CLI
npm run console:docs
```

---

## Stack Tecnológico

| Tecnología | Uso |
|---|---|
| [NestJS](https://nestjs.com/) | Framework HTTP + inyección de dependencias |
| [@nestjs/cqrs](https://docs.nestjs.com/recipes/cqrs) | Command Bus y Query Bus |
| [Cucumber](https://cucumber.io/) | Tests de aceptación BDD |
| [TypeScript](https://www.typescriptlang.org/) | Lenguaje principal |
| [SuperTest](https://github.com/ladjs/supertest) | HTTP assertions en tests |
