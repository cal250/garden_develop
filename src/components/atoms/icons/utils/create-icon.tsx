import React, { Children } from "react";
import { forwardRef } from "@/components/utils/react/polymorphism";
import { IconProps } from "@/components/atoms/icons/utils/icon";
import { twMerge } from "tailwind-merge";

export interface CreateIconOptions {
  /**
   * The icon `svg` viewBox
   * @default "0 0 24 24"
   */
  viewBox?: string;

  /**
   * The `svg` path or group element
   */
  path?:
    | React.ReactElement
    | React.ReactElement[]
    | ((props: IconProps) => React.ReactNode);

  /**
   * Single `path` for the svg
   */
  d?: string;

  /**
   * The display name, useful for debugging
   */
  displayName?: string;

  /**
   * Default props to be passed to the icon component
   */
  defaultProps?: IconProps;
}

export function createIcon<P extends object = {}>(options: CreateIconOptions) {
  const { viewBox = "0 0 24 24", d, displayName, defaultProps } = options;

  const path =
    typeof options.path === "function"
      ? options.path
      : Children.toArray(options.path);

  const Component = forwardRef<IconProps & P, "svg">(({ ...props }, ref) => {
    return (
      <svg
        ref={ref}
        viewBox={viewBox}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        shapeRendering="geometricPrecision"
        width="1em"
        height="1em"
        {...defaultProps}
        {...props}
        fill={defaultProps?.fill || props.fill || "currentColor"}
        className={twMerge(
          "leading inline-block h-4 w-4",
          defaultProps?.className,
          props.className,
        )}
      >
        {typeof path === "function" ? (
          path({
            ...props,
            fill: props.fill || defaultProps?.fill || "currentColor",
          })
        ) : path?.length ? (
          path
        ) : (
          <path d={d} />
        )}
      </svg>
    );
  });

  Component.displayName = displayName;

  return Component;
}
