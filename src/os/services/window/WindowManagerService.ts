import { Service } from "../../kernel/Service";
import type { WindowInstance } from "./types";

export class WindowManagerService extends Service {
  id = "window-manager";

  private windows: WindowInstance[] = [];
  private listeners = new Set<() => void>();

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private emit() {
    for (const listener of this.listeners) {
      listener();
    }
  }

  getWindows() {
    return this.windows;
  }

  openWindow(partial?: Partial<WindowInstance>) {
    const id =
      partial?.id ??
      `window-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    const newWindow: WindowInstance = {
      id,
      title: partial?.title ?? "Untitled",
      x: partial?.x ?? 120,
      y: partial?.y ?? 120,
      width: partial?.width ?? 500,
      height: partial?.height ?? 300,
      minimized: partial?.minimized ?? false,
      maximized: partial?.maximized ?? false,
      focused: true,
    };

    this.windows = this.windows.map((window) => ({
      ...window,
      focused: false,
    }));

    this.windows = [...this.windows, newWindow];
    this.emit();

    return newWindow;
  }

  closeWindow(id: string) {
    this.windows = this.windows.filter((window) => window.id !== id);
    this.emit();
  }

  focusWindow(id: string) {
    const target = this.windows.find((window) => window.id === id);
    if (!target) return;

    this.windows = [
      ...this.windows
        .filter((window) => window.id !== id)
        .map((window) => ({ ...window, focused: false })),
      { ...target, focused: true },
    ];

    this.emit();
  }
}