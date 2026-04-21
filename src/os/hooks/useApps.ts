import { useEffect, useState } from "react";
import { useKernel } from "../kernel/KernelContext";
import { AppManagerService } from "../services/app/AppManagerService";

export function useApps() {
  const kernel = useKernel();
  const [apps, setApps] = useState([]);

  useEffect(() => {
    let unsub = () => {};
    let mounted = true;

    (async () => {
      await kernel.loadService("app-manager");
      const am = kernel.get<AppManagerService>("app-manager");

      if (!mounted) return;

      setApps([...am.getRunningApps()]);
      unsub = am.subscribe(() => {
        setApps([...am.getRunningApps()]);
      });
    })();

    return () => {
      mounted = false;
      unsub();
    };
  }, [kernel]);

  return apps;
}