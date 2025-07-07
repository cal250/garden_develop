import { breakpoints } from "@/hooks/use-breakpoints";

type DeviceType = "mobile" | "tablet" | "desktop" | "breakpoint";

export type Device = {
  name: string;
  styles: {
    width: string;
    height: string;
  };
  type: DeviceType;
};

const devices = {
  base: "Mobile",
  sm: "Tablet",
  md: "Laptop",
  lg: "Desktop",
  xl: "Wide",
};

const keys = ["base", "sm", "md", "lg", "xl"];

const viewports = keys.reduce((acc, key, index) => {
  const value =
    key === "base" ? 0 : Number(Object.values(breakpoints)[index - 1]);
  const nextValue =
    index === keys.length - 1 ? -1 : Number(Object.values(breakpoints)[index]);
  return {
    ...acc,
    [key]: {
      name: `${(devices as any)[key]} (${value}px ${nextValue === -1 ? "and up" : `to ${nextValue - 1}px`})`,
      styles: {
        width: key === "base" ? "480px" : `${value}px`,
        height: "1200px",
      },
      type: "breakpoint",
    },
  };
}, {});

export default viewports;
