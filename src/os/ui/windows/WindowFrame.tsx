import type { WindowInstance } from "../../services/window/types";

type Props = {
  window: WindowInstance;
};

export default function WindowFrame({ window }: Props) {
  return (
    <div
      style={{
        position: "absolute",
        left: window.x,
        top: window.y,
        width: window.width,
        height: window.height,
        background: "#1e1e1e",
        color: "white",
        border: window.focused ? "1px solid #6aa9ff" : "1px solid #555",
        borderRadius: 10,
        boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          height: 36,
          display: "flex",
          alignItems: "center",
          padding: "0 12px",
          background: window.focused ? "#2d2d2d" : "#252525",
          borderBottom: "1px solid #444",
          fontWeight: 600,
        }}
      >
        {window.title}
      </div>

      <div style={{ padding: 12 }}>
        Empty window
      </div>
    </div>
  );
}