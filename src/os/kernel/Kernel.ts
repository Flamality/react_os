import { Service } from "./Service";

type ServiceFactory = () => Promise<Service> | Service;

export class Kernel {
  private factories = new Map<string, ServiceFactory>();
  private instances = new Map<string, Service>();

  registerFactory(id: string, factory: ServiceFactory) {
    this.factories.set(id, factory);
  }

  async loadService(id: string) {
    if (this.instances.has(id)) return this.instances.get(id)!;

    const factory = this.factories.get(id);
    if (!factory) {
      throw new Error(`No factory registered for service "${id}"`);
    }

    const service = await factory();

    for (const dep of service.dependencies ?? []) {
      await this.loadService(dep);
    }

    this.instances.set(id, service);

    await service.load(this);
    await service.start(this);

    return service;
  }

  async unloadService(id: string) {
    const service = this.instances.get(id);
    if (!service) return;

    await service.stop(this);
    await service.unload(this);

    this.instances.delete(id);
  }

  get<T extends Service = Service>(id: string): T {
    const service = this.instances.get(id);
    if (!service) {
      throw new Error(`Service "${id}" is not loaded`);
    }
    return service as T;
  }
  getRunningServices() {
    return Array.from(this.instances.values());
  }

  getRunningServiceIds() {
    return Array.from(this.instances.keys());
  }
  getServiceInfo() {
  return Array.from(this.instances.entries()).map(([id, service]) => ({
    id,
    dependencies: service.dependencies ?? [],
  }));
}
}