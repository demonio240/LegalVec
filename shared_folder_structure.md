# Estructura y Propósito de la Carpeta Shared (DDD)

Este documento detalla la organización de la carpeta `Shared` dentro de un **Bounded Context**, tomando como referencia el proyecto PHP de Codely (`Mooc`) y adaptándolo a la arquitectura de `LegalVec`.

## 1. Niveles de "Shared" en DDD

En una arquitectura limpia y modular, existen tres niveles de código compartido:

1.  **Global Shared (`src/Shared`)**: Elementos universales de la aplicación (e.g., el Value Object `Uuid`, el `CommandBus` genérico, clases base de excepciones).
2.  **Context Shared (`src/DocumentProcessing/Shared`)**: Elementos compartidos entre módulos de un mismo contexto (e.g., algo que usan `Vectorizer` y `TextRecognition`). **Este es el equivalente a `src/Mooc/Shared`**.
3.  **Module Shared (`src/DocumentProcessing/Vectorizer/Shared`)**: (Opcional) Elementos compartidos solo entre los casos de uso de un módulo específico.

---

## 2. Análisis de `Mooc/Shared` (Referencia PHP)

La carpeta `Shared` de Mooc se divide principalmente en dos áreas:

### A. Domain (`Mooc/Shared/Domain`)
Su objetivo es permitir la interoperabilidad entre módulos sin crear dependencias circulares.

*   **Agregado IDs**: Contiene carpetas por módulo (e.g., `Courses/CourseId.php`).
    *   *Por qué:* Si el módulo de `Videos` necesita saber a qué curso pertenece un video, usa `CourseId`. No necesita importar todo el agregado `Course`.
*   **Value Objects Transversales**: Conceptos que pertenecen al contexto pero no a un módulo específico.
*   **Domain Events**: Definiciones de eventos que pueden ser lanzados por cualquier módulo del contexto.

### B. Infrastructure (`Mooc/Shared/Infrastructure`)
Centraliza la fontanería técnica del contexto.

*   **Dependency Injection**: Archivos como `mooc_services.yaml`. Aquí se define cómo NestJS (en tu caso) debe instanciar los servicios del contexto.
*   **Persistence**: Fábricas de conexión a base de datos (e.g., `MoocEntityManagerFactory.php`). Asegura que todos los módulos del contexto compartan la misma conexión y configuración de base de datos.
*   **Framework**: Adaptadores específicos del framework (Symfony en el ejemplo, NestJS en el tuyo) que son comunes a todo el contexto.

---

## 3. Propuesta para `LegalVec`

Basado en lo anterior, así deberías organizar tu código compartido:

### En `src/DocumentProcessing/Shared` (Context Level)

Este es el lugar para la comunicación entre `Vectorizer` y `TextRecognition`.

| Carpeta | Contenido Sugerido | Ejemplo Real |
| :--- | :--- | :--- |
| `Domain/IDs` | IDs de los agregados principales. | `ElementId.ts`, `DocumentId.ts` |
| `Domain/VOs` | Conceptos geométricos o de imagen. | `Point.ts`, `Rectangle.ts`, `Color.ts` |
| `Infrastructure/Persistence` | Configuración de TypeORM/Mongoose. | `DocumentProcessingConnection.ts` |
| `Infrastructure/NestJS` | Módulo compartido de Nest. | `DocumentProcessingSharedModule.ts` |

### En `src/DocumentProcessing/Vectorizer/Shared` (Module Level)

Usa esta carpeta **solo si** `Vectorizer` se vuelve muy complejo (múltiples agregados).

*   **Domain**: Value Objects que solo tienen sentido dentro de la vectorización (e.g., `QuantizationLevel`, `PathSimplificationType`).
*   **Infrastructure**: Repositorios base o servicios de terceros que solo usa la vectorización (e.g., una librería específica de SVG).

---

## 4. Mejores Prácticas

> [!TIP]
> **Regla de Oro**: Si un Value Object es usado por dos módulos distintos, muévelo a `Shared/Domain`. Si solo lo usa uno, mantenlo dentro del `Domain` de ese módulo.

> [!IMPORTANT]
> **Evita el acoplamiento**: Nunca pongas lógica de aplicación (use cases) en la carpeta `Shared`. `Shared` es solo para bloques de construcción (Value Objects, Interfaces, Configuración).

> [!NOTE]
> En NestJS, la carpeta `Shared/Infrastructure` suele contener los **Providers** y **Symbols** que definen tu Inyección de Dependencias, similar a cómo el `.yaml` lo hace en el proyecto PHP.
