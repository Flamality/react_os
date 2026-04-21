import { Service } from "../../kernel/Service";

type RunningApp = {
  id: string;        // instance id
  appId: string;     // "browser", "settings"
  title: string;
};

export class AppManagerService extends Service {
  id = "app-manager";

  private runningApps: RunningApp[] = [];
  private listeners = new Set<() => void>();

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private emit() {
    this.listeners.forEach((l) => l());
  }

  getRunningApps() {
    return this.runningApps;
  }

  launchApp(appId: string) {
    const id = `app-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

    const app: RunningApp = {
      id,
      appId,
      title: appId,
    };

    this.runningApps.push(app);
    this.emit();

    return app;
  }

  closeApp(id: string) {
    this.runningApps = this.runningApps.filter((a) => a.id !== id);
    this.emit();
  }
}