import React, { useMemo, useState } from "react";
import { createService } from "./factory/Factory";

type WindowData = {
  id: string;
  title: string;
  appId: string;
};

type WindowManagerService = {
  windows: WindowData[];
  openWindow: (appId: string, title: string) => void;
  closeWindow: (id: string) => void;
};

const { Context, useService } = createService<WindowManagerService>("WindowManager");

export const useWindowManager = useService;

export function WindowManagerProvider({ children }: { children: React.ReactNode }) {
  const [windows, setWindows] = useState<WindowData[]>([]);

  const value = useMemo<WindowManagerService>(() => ({
    windows,

    openWindow(appId, title) {
      setWindows(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          appId,
          title,
        },
      ]);
    },

    closeWindow(id) {
      setWindows(prev => prev.filter(w => w.id !== id));
    },
  }), [windows]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}