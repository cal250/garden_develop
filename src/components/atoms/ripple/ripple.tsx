import type { RippleType } from "./use-ripple";
import React, { FC } from "react";
import type { HTMLMotionProps } from "framer-motion";
import { AnimatePresence, LazyMotion, m } from "framer-motion";
import type { HTMLNextUIProps } from "@nextui-org/system";
import { clamp } from "@nextui-org/shared-utils";

export interface RippleProps extends HTMLNextUIProps<"span"> {
  ripples: RippleType[];
  color?: string;
  motionProps?: HTMLMotionProps<"span">;
  style?: React.CSSProperties;
  onClear: (key: React.Key) => void;
}

const domAnimation = () =>
  import("@nextui-org/dom-animation").then((res) => res.default);

const Ripple: FC<RippleProps> = (props) => {
  const {
    ripples = [],
    motionProps,
    color = "currentColor",
    style,
    onClear,
  } = props;

  return (
    <>
      {ripples.map((ripple) => {
        const duration = clamp(
          0.01 * ripple.size,
          0.2,
          ripple.size > 100 ? 0.75 : 0.5,
        );

        return (
          <LazyMotion key={ripple.key} features={domAnimation}>
            <AnimatePresence mode="popLayout">
              <m.span
                animate={{ transform: "scale(2)", opacity: 0 }}
                className="nextui-ripple"
                exit={{ opacity: 0 }}
                initial={{ transform: "scale(0)", opacity: 0.35 }}
                style={{
                  position: "absolute",
                  backgroundColor: color,
                  borderRadius: "100%",
                  transformOrigin: "center",
                  pointerEvents: "none",
                  overflow: "hidden",
                  inset: 0,
                  zIndex: 0,
                  top: ripple.y,
                  left: ripple.x,
                  width: `${ripple.size}px`,
                  height: `${ripple.size}px`,
                  ...style,
                }}
                transition={{ duration }}
                onAnimationComplete={() => {
                  onClear(ripple.key);
                }}
                {...motionProps}
              />
            </AnimatePresence>
          </LazyMotion>
        );
      })}
    </>
  );
};

Ripple.displayName = "Ripple";

export default Ripple;
