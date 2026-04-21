import { useServices } from "../../hooks/useServices";
import { useApps } from "../../hooks/useApps";

export default function TaskManagerApp() {
  const services = useServices();
  const apps = useApps();

  return (
    <div style={{ padding: 12 }}>
      <h2>Task Manager</h2>

      <h3>Services</h3>
      <ul>
        {services.map((id) => (
          <li key={id}>{id}</li>
        ))}
      </ul>

      <h3 style={{ marginTop: 12 }}>Apps</h3>
      <ul>
        {apps.map((app: any) => (
          <li key={app.id}>
            {app.title} ({app.appId})
          </li>
        ))}
      </ul>
    </div>
  );
}