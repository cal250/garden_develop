import { Breakpoints, useBreakpoints } from "@/hooks/use-breakpoints";

type ResponsiveValue = string | number | boolean | null;

type ResponsiveValueMap<T extends ResponsiveValue> = Partial<
  Record<Breakpoints, T>
> & {
  base: T;
};

export function useResponsiveValue<T extends ResponsiveValue>(
  value: ResponsiveValueMap<T>,
): T {
  const { isSm, isMd, isLg, isXl } = useBreakpoints();

  if (isXl) {
    return value.xl ?? value.lg ?? value.md ?? value.sm ?? value.base;
  }

  if (isLg) {
    return value.lg ?? value.md ?? value.sm ?? value.base;
  }

  if (isMd) {
    return value.md ?? value.sm ?? value.base;
  }

  if (isSm) {
    return value.sm ?? value.base;
  }

  return value.base;
}
