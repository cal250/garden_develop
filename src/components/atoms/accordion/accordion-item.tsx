import type { Variants } from "framer-motion";
import { AnimatePresence, LazyMotion, m, useWillChange } from "framer-motion";
import { ReactNode, useMemo } from "react";
import { TRANSITION_VARIANTS } from "@nextui-org/framer-utils";

import { useAccordionItem, UseAccordionItemProps } from "./use-accordion-item";
import { withPolygon } from "@/components/utils/react/polymorphism";
import { ChevronLeftIcon } from "@/components/atoms/icons";

export interface AccordionItemProps extends UseAccordionItemProps {}

const domAnimation = () =>
  import("@nextui-org/dom-animation").then((res) => res.default);

const AccordionItem = withPolygon<AccordionItemProps, "button">(
  (Polygon, props, ref) => {
    const {
      HeadingComponent,
      classNames,
      slots,
      indicator,
      children,
      title,
      subtitle,
      startContent,
      isOpen,
      isDisabled,
      hideIndicator,
      keepContentMounted,
      disableAnimation,
      motionProps,
      getBaseProps,
      getHeadingProps,
      getButtonProps,
      getTitleProps,
      getSubtitleProps,
      getContentProps,
      getIndicatorProps,
    } = useAccordionItem({ ...props, ref });

    const willChange = useWillChange();

    const indicatorContent = useMemo<ReactNode | null>(() => {
      if (typeof indicator === "function") {
        return indicator({
          indicator: <ChevronLeftIcon />,
          isOpen,
          isDisabled,
        });
      }

      if (indicator) return indicator;

      return null;
    }, [indicator, isOpen, isDisabled]);

    const indicatorComponent = indicatorContent || <ChevronLeftIcon />;

    const content = useMemo(() => {
      if (disableAnimation) {
        return <div {...getContentProps()}>{children}</div>;
      }

      const transitionVariants: Variants = {
        exit: { ...TRANSITION_VARIANTS.collapse.exit, overflowY: "hidden" },
        enter: { ...TRANSITION_VARIANTS.collapse.enter, overflowY: "unset" },
      };

      return keepContentMounted ? (
        <LazyMotion features={domAnimation}>
          <m.section
            key="accordion-content"
            animate={isOpen ? "enter" : "exit"}
            exit="exit"
            initial="exit"
            style={{ willChange }}
            variants={transitionVariants}
            onKeyDown={(e) => {
              e.stopPropagation();
            }}
            {...motionProps}
          >
            <div {...getContentProps()}>{children}</div>
          </m.section>
        </LazyMotion>
      ) : (
        <AnimatePresence initial={false}>
          {isOpen && (
            <LazyMotion features={domAnimation}>
              <m.section
                key="accordion-content"
                animate="enter"
                exit="exit"
                initial="exit"
                style={{ willChange }}
                variants={transitionVariants}
                onKeyDown={(e) => {
                  e.stopPropagation();
                }}
                {...motionProps}
              >
                <div {...getContentProps()}>{children}</div>
              </m.section>
            </LazyMotion>
          )}
        </AnimatePresence>
      );
    }, [isOpen, disableAnimation, keepContentMounted, children, motionProps]);

    return (
      <Polygon {...getBaseProps()}>
        <HeadingComponent {...getHeadingProps()}>
          <button {...getButtonProps()}>
            {startContent && (
              <div
                className={slots.startContent({
                  class: classNames?.startContent,
                })}
              >
                {startContent}
              </div>
            )}
            <div
              className={slots.titleWrapper({
                class: classNames?.titleWrapper,
              })}
            >
              {title && <span {...getTitleProps()}>{title}</span>}
              {subtitle && <span {...getSubtitleProps()}>{subtitle}</span>}
            </div>
            {!hideIndicator && indicatorComponent && (
              <span {...getIndicatorProps()}>{indicatorComponent}</span>
            )}
          </button>
        </HeadingComponent>
        {content}
      </Polygon>
    );
  },
);

AccordionItem.displayName = "AccordionItem";

export default AccordionItem;
