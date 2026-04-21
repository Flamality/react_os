import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { Kernel } from "./Kernel";

const KernelContext = createContext<Kernel | null>(null);

export function KernelProvider({
  kernel,
  children,
}: {
  kernel: Kernel;
  children: ReactNode;
}) {
  return (
    <KernelContext.Provider value={kernel}>
      {children}
    </KernelContext.Provider>
  );
}

export function useKernel() {
  const kernel = useContext(KernelContext);
  if (!kernel) {
    throw new Error("KernelProvider is missing");
  }
  return kernel;
}