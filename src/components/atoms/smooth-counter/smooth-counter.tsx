import React from "react";
import { withPolygon } from "@/components/utils/react/polymorphism";
import { useSmoothCounter, UseSmoothCounterProps } from "./use-smooth-counter";
import { AnimatePresence, motion } from "framer-motion";

export interface SmoothCounterProps extends UseSmoothCounterProps {}

const SmoothCounter = withPolygon<SmoothCounterProps>(
  (PolygonComponent, props, ref) => {
    const { getCounterProps, value, duration } = useSmoothCounter(props, ref);

    return (
      <PolygonComponent {...getCounterProps()}>
        <AnimatePresence initial={false}>
          <motion.span
            key={value}
            initial={{ y: "-100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 300,
              duration: duration / props.value,
            }}
            style={{ position: "absolute", width: "100%" }}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </PolygonComponent>
    );
  },
);

export default SmoothCounter;
