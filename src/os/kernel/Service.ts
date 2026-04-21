import type { Kernel } from "./Kernel";

export abstract class Service {
  abstract id: string;
  dependencies?: string[] = [];

  async load(_kernel: Kernel) {}
  async start(_kernel: Kernel) {}
  async stop(_kernel: Kernel) {}
  async unload(_kernel: Kernel) {}
}