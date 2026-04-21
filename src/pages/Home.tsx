import { KernelProvider } from "../os/kernel/KernelContext";
import { createKernel } from "../os/kernel/createKernel";
import Desktop from "../os/ui/desktop/Desktop";
// import Taskbar from "../os/ui/taskbar/Taskbar";
// import WindowLayer from "../os/ui/windows/WindowLayer";
// import StartMenu from "../os/ui/start/StartMenu";

const kernel = createKernel();

export default function Home() {
  return (
    <KernelProvider kernel={kernel}>
      <Desktop />
      {/* <WindowLayer />
      <Taskbar />
      <StartMenu /> */}
    </KernelProvider>
  );
}