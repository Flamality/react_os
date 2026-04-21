export const taskManagerManifest = {
  id: "task-manager",
  name: "Task Manager",
  icon: "activity",
  windowed: true,
  defaultSize: {
    width: 500,
    height: 400,
  },
  load: async () => {
    const mod = await import("./TaskManagerApp");
    return mod.default;
  },
};