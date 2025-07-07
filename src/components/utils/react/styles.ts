import { SlotClasses } from "@/components/utils/react/types";
import { twMerge } from "tailwind-merge";

export function mergeClasses(...classes: SlotClasses[]): SlotClasses {
  return classes.reduce(
    (acc: Record<string, any>, curr: Record<string, any>) => {
      Object.keys(curr || {}).forEach((key) => {
        if (acc[key]) {
          acc[key] = twMerge(acc[key], curr[key]);
        } else {
          acc[key] = curr[key];
        }
      });
      return acc;
    },
    {} as SlotClasses,
  );
}
