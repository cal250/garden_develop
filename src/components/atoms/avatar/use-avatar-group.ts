import React, { cloneElement, ReactNode, useMemo } from "react";
import type {
  AvatarGroupSlots,
  AvatarGroupVariantProps,
  SlotsToClasses,
} from "@nextui-org/theme";
import { avatarGroup } from "@nextui-org/theme";
import { HTMLNextUIProps, PropGetter } from "@nextui-org/system";
import { getValidChildren, ReactRef, useDOMRef } from "@nextui-org/react-utils";
import { clsx, compact } from "@nextui-org/shared-utils";

import { AvatarProps } from "./index";
import { PolygonProps } from "@/components/atoms/polygon/polygon";

interface Props extends HTMLNextUIProps<"div"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>;
  /**
   * Whether the avatars should be displayed in a grid
   */
  isGrid?: boolean;
  /**
   * The maximum number of visible avatars
   * @default 5
   */
  max?: number;
  /**
   * Control the number of avatar not visible
   */
  total?: number;
  /**
   * This allows you to render a custom count component.
   */
  renderCount?: (count: number) => ReactNode;
  /**
   * Classname or List of classes to change the classNames of the avatar group.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <AvatarGroup classNames={{
   *    base: "base-classes",
   *    count: "count-classes"
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<AvatarGroupSlots>;
}

export type UseAvatarGroupProps<T extends PolygonProps> = Props &
  Omit<AvatarGroupVariantProps, "children" | "isGrid"> &
  Partial<
    Pick<AvatarProps, "size" | "color" | "radius" | "isDisabled" | "isBordered">
  > & {
    polygon?: React.ComponentType<T>;
    polygonProps?: T;
  };

export interface ContextType<T extends PolygonProps = PolygonProps> {
  polygon?: React.ComponentType<T>;
  polygonProps?: T;
  size?: AvatarProps["size"];
  color?: AvatarProps["color"];
  radius?: AvatarProps["radius"];
  isGrid?: boolean;
  isBordered?: AvatarProps["isBordered"];
  isDisabled?: AvatarProps["isDisabled"];
}

export function useAvatarGroup<T extends PolygonProps>(
  props: UseAvatarGroupProps<T> = {},
) {
  const {
    as,
    ref,
    max = 5,
    total,
    size,
    color,
    radius,
    children,
    isBordered,
    isDisabled,
    isGrid,
    renderCount,
    className,
    classNames,
    polygon,
    polygonProps,
    ...otherProps
  } = props;

  const domRef = useDOMRef(ref);

  const Component = as || "div";

  const context = useMemo<ContextType<T>>(
    () => ({
      size,
      color,
      radius,
      isGrid,
      isBordered,
      isDisabled,
      polygon,
      polygonProps,
    }),
    [
      size,
      color,
      radius,
      isGrid,
      isBordered,
      isDisabled,
      polygon,
      polygonProps,
    ],
  );
  const slots = useMemo(
    () => avatarGroup({ className, isGrid }),
    [className, isGrid],
  );

  const validChildren = getValidChildren(children);
  const childrenWithinMax = max ? validChildren.slice(0, max) : validChildren;

  const remainingCount = total
    ? total
    : max != null
      ? validChildren.length - max
      : -1;

  const clones = childrenWithinMax.map((child, index) => {
    const isFirstAvatar = index === 0;
    const isLastAvatar = index === childrenWithinMax.length - 1;

    const childProps = {
      polygon: context.polygon,
      ...context.polygonProps,
      ...child.props,
      className: clsx(
        isFirstAvatar ? "ms-0" : !isGrid ? "-ms-2" : "",
        isLastAvatar && remainingCount < 1 ? "hover:-translate-x-0" : "",
      ),
    };

    return cloneElement(child, compact(childProps));
  });

  const getAvatarGroupProps: PropGetter = () => {
    return {
      ref: domRef,
      className: slots.base({
        class: clsx(classNames?.base, className),
      }),
      role: "group",
      ...otherProps,
    };
  };

  const getAvatarGroupCountProps = () => {
    return {
      className: slots.count({
        class: classNames?.count,
      }),
    } as AvatarProps;
  };

  return {
    Component,
    context,
    remainingCount,
    clones,
    renderCount,
    getAvatarGroupProps,
    getAvatarGroupCountProps,
  };
}

export type UseAvatarReturn = ReturnType<typeof useAvatarGroup>;
