import { HTMLNextUIProps } from "@nextui-org/system";
import { clsx, dataAttr } from "@nextui-org/shared-utils";
import { AnimatePresence, HTMLMotionProps, LazyMotion, m } from "framer-motion";
import { mergeProps } from "@react-aria/utils";
import { Overlay } from "@react-aria/overlays";

import { menuVariants } from "./navbar-menu-transitions";
import { useNavbarContext } from "./navbar-context";
import React from "react";
import { withPolygon } from "@/components/utils/react/polymorphism";

export interface NavbarMenuProps extends HTMLNextUIProps<"ul"> {
  children?: React.ReactNode;
  /**
   * The container element in which the navbar menu overlay portal will be placed.
   * @default document.body
   */
  portalContainer?: Element;
  /**
   * The props to modify the framer motion animation. Use the `variants` API to create your own animation.
   */
  motionProps?: HTMLMotionProps<"ul">;
}

const domAnimation = () =>
  import("@nextui-org/dom-animation").then((res) => res.default);

const NavbarMenu = withPolygon<NavbarMenuProps, "ul">((Polygon, props) => {
  const {
    className,
    children,
    portalContainer,
    motionProps,
    style,
    ...otherProps
  } = props;

  const { slots, isMenuOpen, height, disableAnimation, classNames } =
    useNavbarContext();

  const styles = clsx(classNames?.menu, className);

  const contents = disableAnimation ? (
    <Polygon
      className={slots.menu?.({ class: styles })}
      data-open={dataAttr(isMenuOpen)}
      style={{
        // @ts-expect-error
        "--navbar-height": typeof height === "number" ? `${height}px` : height,
      }}
      {...otherProps}
    >
      {children}
    </Polygon>
  ) : (
    <AnimatePresence mode="wait">
      {isMenuOpen ? (
        <LazyMotion features={domAnimation}>
          <Polygon
            layoutScroll
            animate="enter"
            className={slots.menu?.({ class: styles })}
            data-open={dataAttr(isMenuOpen)}
            exit="exit"
            initial="exit"
            style={{
              // @ts-expect-error
              "--navbar-height":
                typeof height === "number" ? `${height}px` : height,
              ...style,
            }}
            variants={menuVariants}
            {...mergeProps(motionProps, otherProps)}
            as={m.ul}
          >
            {children}
          </Polygon>
        </LazyMotion>
      ) : null}
    </AnimatePresence>
  );

  return <Overlay portalContainer={portalContainer}>{contents}</Overlay>;
}, "ul");

NavbarMenu.displayName = "NextUI.NavbarMenu";

export default NavbarMenu;
