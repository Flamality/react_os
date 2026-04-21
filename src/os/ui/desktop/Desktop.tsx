import { useOpenWindow } from "../../hooks/useOpenWindow";

export default function Desktop() {
  const openWindow = useOpenWindow();

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background:
          "linear-gradient(135deg, rgb(22, 27, 34) 0%, rgb(35, 45, 65) 100%)",
      }}
    >
      <button
        onClick={() =>
          openWindow({
            title: "My First Window",
            x: 140,
            y: 100,
            width: 520,
            height: 320,
          })
        }
        style={{
          margin: 24,
          padding: "10px 14px",
          borderRadius: 8,
          border: "1px solid #555",
          background: "#2a2a2a",
          color: "white",
          cursor: "pointer",
        }}
      >
        Open Window
      </button>
    </div>
  );
}