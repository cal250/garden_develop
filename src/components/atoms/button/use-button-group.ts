import type { ButtonProps } from "./index";
import type { ReactRef } from "@nextui-org/react-utils";
import type { ButtonGroupVariantProps } from "@nextui-org/theme";

import { buttonGroup } from "@nextui-org/theme";
import {
  HTMLNextUIProps,
  PropGetter,
  mapPropsVariants,
  useProviderContext,
} from "@nextui-org/system";
import { useDOMRef } from "@nextui-org/react-utils";
import { useMemo, useCallback } from "react";
import { objectToDeps } from "@nextui-org/shared-utils";
interface Props extends HTMLNextUIProps, ButtonGroupVariantProps {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>;
  /**
   * Whether the buttons are disabled.
   * @default false
   */
  isDisabled?: ButtonProps["isDisabled"];
}

export type ContextType = {
  size?: ButtonProps["size"];
  color?: ButtonProps["color"];
  variant?: ButtonProps["variant"];
  radius?: ButtonProps["radius"];
  isDisabled?: ButtonProps["isDisabled"];
  disableAnimation?: ButtonProps["disableAnimation"];
  disableRipple?: ButtonProps["disableRipple"];
  isIconOnly?: ButtonProps["isIconOnly"];
  fullWidth?: boolean;
};

export type UseButtonGroupProps = Props &
  Partial<
    Pick<
      ButtonProps,
      | "size"
      | "color"
      | "radius"
      | "variant"
      | "isIconOnly"
      | "disableAnimation"
      | "disableRipple"
    >
  >;

export function useButtonGroup(originalProps: UseButtonGroupProps) {
  const globalContext = useProviderContext();
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    buttonGroup.variantKeys,
  );

  const {
    ref,
    as,
    children,
    color = "default",
    size = "md",
    variant = "solid",
    radius,
    isDisabled = false,
    isIconOnly = false,
    disableRipple = globalContext?.disableRipple ?? false,
    disableAnimation = globalContext?.disableAnimation ?? false,
    className,
    ...otherProps
  } = props;

  const Component = as || "div";

  const domRef = useDOMRef(ref);

  const classNames = useMemo(
    () =>
      buttonGroup({
        ...variantProps,
        className,
      }),
    [objectToDeps(variantProps), className],
  );

  const context = useMemo<ContextType>(
    () => ({
      size,
      color,
      variant,
      radius,
      isIconOnly,
      isDisabled,
      disableAnimation,
      disableRipple,
      fullWidth: !!originalProps?.fullWidth,
    }),
    [
      size,
      color,
      variant,
      radius,
      isDisabled,
      isIconOnly,
      disableAnimation,
      disableRipple,
      originalProps?.fullWidth,
    ],
  );

  const getButtonGroupProps: PropGetter = useCallback(
    () => ({
      role: "group",
      ...otherProps,
    }),
    [otherProps],
  );

  return {
    Component,
    children,
    domRef,
    context,
    classNames,
    getButtonGroupProps,
  };
}

export type UseButtonGroupReturn = ReturnType<typeof useButtonGroup>;
