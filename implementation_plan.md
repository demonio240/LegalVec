# Módulo `Vectorizer` — Diseño Completo (Imagen → SVG Optimizado)

El módulo `Vectorizer` tiene una responsabilidad completa de extremo a extremo:
recibir una imagen rasterizada (PNG/JPG) y devolver un elemento SVG optimizado listo para
almacenarse y usarse. Esto implica dos etapas internas orquestadas por el mismo caso de uso.

---

## Reglas de Negocio Redefinidas

El módulo `Vectorizer` ejecuta un **Pipeline de dos fases en memoria**, síncrono y sin acoplamiento externo más allá del servicio de trazado.

### Fase 1 — Trazado de Imagen (Image Tracing)

| Aspecto | Definición |
|---|---|
| **Entrada** | Imagen rasterizada en memoria (`Buffer`) |
| **Proceso** | Convertir píxeles en trazados de polígonos SVG usando un algoritmo de trazado (Potrace o similar) |
| **Salida** | SVG crudo con todos sus nodos sin optimizar |
| **Responsable** | `ImageTracerService` — interfaz de dominio, implementada en Infraestructura |

### Fase 2 — Pipeline de Optimización (5 Pasos Secuenciales)

| Paso | Regla | Criterio Verificable |
|---|---|---|
| 1. Aniquilación de Fantasmas | Purgar nodos con relleno `#FFFFFF` puro o transparencia total | Array de nodos disminuye en longitud |
| 2. Simplificación Adaptativa | Douglas-Peucker con épsilon dinámico (% del Bounding Box según `scale`) | Reducción de nodos sin pérdida visual |
| 3. Limpieza Colineal | Eliminar vértices en ángulo de 180° o nodos microscópicos superpuestos | Eliminación de puntos superfluos |
| 4. Ajuste a Curvas Bézier | Sustituir segmentos por Curvas de Bézier cúbicas (C) | Reducción de comandos `L`, mantiene Pixel-Perfect |
| 5. Cuantización | Redondear coordenadas a 1 o 2 decimales | Maximizar compresión del XML/SVG final |

---

## Flujo de Datos Completo

```
VectorizeElementCommand
  { elementId, imageBuffer, scale, quantizationPrecision }
          │
          ▼
VectorizeElement (Application — Use Case)
          │
          ├─► ImageTracerService.trace(imageBuffer)  ← Domain Service (interfaz)
          │        │
          │        └─► rawSvg: string
          │
          ├─► VectorizationPipeline.run(rawSvg, scale, quantizationPrecision)  ← Domain Service (puro)
          │        │
          │        ├── Paso 1: GhostVectorPurger
          │        ├── Paso 2: AdaptiveSimplifier (Douglas-Peucker)
          │        ├── Paso 3: CollinearCleaner
          │        ├── Paso 4: BezierFitter
          │        └── Paso 5: CoordinateQuantizer
          │              │
          │              └─► optimizedSvg: string
          │
          ├─► VectorizedElement.create(elementId, rawSvg, optimizedSvg, metrics)
          │
          ├─► ElementRepository.save(element)
          └─► EventBus.publish(VectorizerCreatedDomainEvent)
```

---

## Datos de Entrada y Salida

### Lo que recibe el Command

```typescript
export class VectorizeElementCommand {
    constructor(
        public readonly elementId: string,       // UUID — identidad del agregado
        public readonly imageBuffer: Buffer,      // imagen cruda en memoria
        public readonly scale: number,            // factor para épsilon dinámico (ej: 0.5)
        public readonly quantizationPrecision: 1 | 2  // decimales para Step 5
    ) {}
}
```

> **Nota sobre `imageBuffer`**: En los tests, el Mother generará un Buffer simulado
> (puede ser un PNG mínimo real en base64). En producción llegará del módulo anterior
> (OCR/Scanner o un upload HTTP).

### Lo que guarda el Agregado `VectorizedElement`

```typescript
export class VectorizedElement {
    readonly id: string;
    readonly rawSvg: string;              // SVG sin optimizar (del tracer)
    readonly optimizedSvg: string;        // SVG resultado del pipeline
    readonly originalNodeCount: number;   // nodos antes del pipeline
    readonly optimizedNodeCount: number;  // nodos después del pipeline
    readonly reductionRate: number;       // % de reducción (métrica de calidad)
    readonly scale: number;
    readonly createdAt: Date;
}
```

---

## Archivos a Crear / Modificar

### Domain Layer

#### [MODIFY] `Element.ts`
Agregar las propiedades del agregado y un factory method estático `create()`.

#### [NEW] `ImageTracerService.ts`
Interfaz de dominio para el trazado de imagen. La implementación vive en Infraestructura.

#### [NEW] `VectorizationPipeline.ts`
Servicio de dominio **puro** que orquesta los 5 pasos. No tiene dependencias externas.
Cada paso será una clase interna o función pura.

#### [NEW] `VectorizerCreatedDomainEvent.ts`
Evento de dominio que se publica cuando un elemento es vectorizado exitosamente.

### Application Layer

#### [MODIFY] `VectorizeElementCommand.ts`
Cambiar `text: string` por `imageBuffer: Buffer`, `scale: number`, `quantizationPrecision: 1 | 2`.

#### [MODIFY] `VectorizeElement.ts`
Inyectar `ElementRepository`, `ImageTracerService`, `EventBus`. Orquestar las dos fases.

#### [MODIFY] `VectorizeElementCommandHandler.ts`
Adaptar para pasar los nuevos parámetros al caso de uso.

### Infrastructure Layer

#### [NEW] `PotraceImageTracerService.ts`
Implementación concreta de `ImageTracerService` usando la librería `potrace` de npm.

### Test Layer — Domain Mothers

#### [MODIFY] `ElementMother.ts`
Implementar `create()` y `fromRequest(command)` con datos realistas.

#### [NEW] `VectorizeElementCommandMother.ts`
Fabrica commands con un Buffer de imagen PNG mínimo válido.

#### [NEW] `VectorizerCreatedDomainEventMother.ts`
Fabrica el evento a partir de un `VectorizedElement`.

#### [MODIFY] `VectorizerModuleUnitTestCase.ts`
Agregar `eventBus()` y `shouldPublishDomainEvent()`.

---

## Open Questions

> [!IMPORTANT]
> **¿Cómo llega la imagen al Command?**
> ¿El `imageBuffer` viene de un upload HTTP directo, de un path en disco, o de otro módulo
> (como `TextRecognition`)? Esto afecta cómo se construye el Mother de prueba y qué
> validaciones hace el Command.

> [!IMPORTANT]
> **¿El `ImageTracerService` es síncrono o asíncrono?**
> Potrace trabaja con callbacks. ¿Preferimos promisificarlo dentro de la implementación
> de infraestructura (recomendado) o aceptamos que el dominio lo trate como async?

> [!NOTE]
> **¿Se guarda el SVG crudo (`rawSvg`) en el agregado?**
> Guardarlo permite auditoría y comparación de calidad. Si el almacenamiento es una
> preocupación, podemos guardar solo `optimizedSvg` y las métricas.

---

## Plan de Verificación

1. Correr `npm test` — todos los tests deben pasar en rojo primero (TDD).
2. Implementar capa por capa siguiendo el orden: Domain → Application → Infrastructure.
3. Verificar que `reductionRate` en `VectorizedElement` refleja correctamente la reducción de nodos.
4. Probar con una imagen PNG real pequeña (un logo simple) y confirmar que el SVG resultante es válido.
