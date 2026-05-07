import { Global, Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ApiExceptionsHttpStatusCodeMapping } from './ApiExceptionsHttpStatusCodeMapping';

// SharedInfrastructureModule — Módulo Global de Infraestructura Compartida
//
// Equivalente al Kernel de Symfony: registra una sola vez los servicios
// compartidos y los hace disponibles en toda la aplicación.
//
// Para agregar un nuevo servicio compartido (Logger, EventBus, etc.):
//   1. Añádelo a providers
//   2. Añádelo a exports
//   3. ¡Listo! Todos los feature modules ya lo tienen disponible.

@Global()
@Module({
    imports: [CqrsModule],
    providers: [ApiExceptionsHttpStatusCodeMapping],
    exports: [CqrsModule, ApiExceptionsHttpStatusCodeMapping],
})
export class SharedInfrastructureModule {}

