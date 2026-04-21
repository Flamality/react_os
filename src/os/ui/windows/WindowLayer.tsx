import { useWindows } from "../../hooks/useWindows";
import WindowFrame from "./WindowFrame";

export default function WindowLayer() {
  const windows = useWindows();

  return (
    <>
      {windows
        .filter((window) => !window.minimized)
        .map((window) => (
          <WindowFrame key={window.id} window={window} />
        ))}
    </>
  );
}