import { useKernel } from "../kernel/KernelContext";

export function useServices() {
  const kernel = useKernel();

  return kernel.getRunningServiceIds();
}