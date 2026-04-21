import { useEffect, useState } from "react";
import { useKernel } from "../kernel/KernelContext";
import { WindowManagerService } from "../services/window/WindowManagerService";

export function useWindows() {
  const kernel = useKernel();
  const [windows, setWindows] = useState(
    () => [] as WindowManagerService["getWindows"] extends () => infer T ? T : never
  );

  useEffect(() => {
    let cleanup = () => {};
    let active = true;

    (async () => {
      await kernel.loadService("window-manager");
      const wm = kernel.get<WindowManagerService>("window-manager");

      if (!active) return;

      setWindows([...wm.getWindows()]);
      cleanup = wm.subscribe(() => {
        setWindows([...wm.getWindows()]);
      });
    })();

    return () => {
      active = false;
      cleanup();
    };
  }, [kernel]);

  return windows;
}