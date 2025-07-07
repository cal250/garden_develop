import { useMemo } from "react";

export function useUniqueId() {
  return useMemo(() => Math.random().toString(36).substring(2, 9), []);
}
