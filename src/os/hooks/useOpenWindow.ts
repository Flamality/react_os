import { useCallback } from "react";
import { useKernel } from "../kernel/KernelContext";
import { WindowManagerService } from "../services/window/WindowManagerService";
import type { WindowInstance } from "../services/window/types";

export function useOpenWindow() {
  const kernel = useKernel();

  return useCallback(
    async (partial?: Partial<WindowInstance>) => {
      await kernel.loadService("window-manager");
      const wm = kernel.get<WindowManagerService>("window-manager");
      return wm.openWindow(partial);
    },
    [kernel]
  );
}