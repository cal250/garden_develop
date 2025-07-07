import React from "react";
import { forwardRef } from "@/components/utils/react/polymorphism";
import { twMerge } from "tailwind-merge";

const barClasses = twMerge([
  "absolute",
  "block",
  "h-[10%]",
  "rounded-full",
  "w-full",
  "bg-current",
  "transition-all",
  "duration-150",
  "rotate-0",
]);

const bar1Classes = twMerge([
  barClasses,
  "top-[8%]",
  "group-data-[open=true]:absolute",
  "group-data-[open=true]:top-1/2",
  "group-data-[open=true]:-translate-y-1/2",
  "group-data-[open=true]:-rotate-45",
]);

const bar3Classes = twMerge([barClasses, "group-data-[open=true]:opacity-0"]);

const bar2Classes = twMerge([
  barClasses,
  "top-[calc(100%_-16%)]",
  "group-data-[open=true]:absolute",
  "group-data-[open=true]:top-1/2",
  "group-data-[open=true]:-translate-y-1/2",
  "group-data-[open=true]:rotate-45",
]);

export const NavbarMenuToggleIcon = forwardRef<
  NavbarMenuToggleIconProps,
  "span"
>(({ bars = 3, className, barClassName }) => {
  return (
    <span
      className={twMerge([
        "pointer-events-none relative flex h-6 w-32 flex-col items-center justify-center text-inherit",
        "group-data-[pressed=true]:opacity-70",
        "transition-opacity",
        className,
      ])}
    >
      <span className={twMerge(bar1Classes, barClassName)} />
      {bars === 3 && <span className={twMerge(bar3Classes, barClassName)} />}
      <span className={twMerge(bar2Classes, barClassName)} />
    </span>
  );
}, "span");

interface NavbarMenuToggleIconProps {
  bars?: 2 | 3;
  className?: string;
  barClassName?: string;
}
