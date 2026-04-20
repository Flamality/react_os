import React, { createContext, useContext } from "react";

export function createService<T>(name: string) {
  const Context = createContext<T | null>(null);

  function useService() {
    const value = useContext(Context);
    if (!value) {
      throw new Error(`${name} service is missing its provider`);
    }
    return value;
  }

  return {
    Context,
    useService,
  };
}