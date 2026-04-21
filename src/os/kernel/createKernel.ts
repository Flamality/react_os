import { Kernel } from "./Kernel";
import { WindowManagerService } from "../services/window/WindowManagerService";
import { AppManagerService } from "../services/app/AppManagerService";

export function createKernel() {
  const kernel = new Kernel();

  kernel.registerFactory("window-manager", () => new WindowManagerService());
  kernel.registerFactory("app-manager", () => new AppManagerService());

  return kernel;
}