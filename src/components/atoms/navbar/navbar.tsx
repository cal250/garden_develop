import { pickChildren } from "@nextui-org/react-utils";
import { LazyMotion, m } from "framer-motion";
import { mergeProps } from "@react-aria/utils";

import { hideOnScrollVariants } from "./navbar-transitions";
import { useNavbar, UseNavbarProps } from "./use-navbar";
import { NavbarProvider } from "./navbar-context";
import NavbarMenu from "./navbar-menu";
import React from "react";
import { withPolygon } from "@/components/utils/react/polymorphism";

export interface NavbarProps extends Omit<UseNavbarProps, "hideOnScroll"> {
  children?: React.ReactNode | React.ReactNode[];
}

const domAnimation = () =>
  import("@nextui-org/dom-animation").then((res) => res.default);

const Navbar = withPolygon<NavbarProps>((Polygon, props, ref) => {
  const { children, ...otherProps } = props;

  const context = useNavbar({ ...otherProps, ref });

  const [childrenWithoutMenu, menu] = pickChildren(children, NavbarMenu);

  const content = (
    <>
      <header {...context.getWrapperProps()}>{childrenWithoutMenu}</header>
      {menu}
    </>
  );

  return (
    <NavbarProvider value={context}>
      {context.shouldHideOnScroll ? (
        <LazyMotion features={domAnimation}>
          <Polygon
            animate={context.isHidden ? "hidden" : "visible"}
            initial={false}
            variants={hideOnScrollVariants}
            {...mergeProps(context.getBaseProps(), context.motionProps)}
            as={m.nav}
          >
            {content}
          </Polygon>
        </LazyMotion>
      ) : (
        <Polygon {...context.getBaseProps()}>{content}</Polygon>
      )}
    </NavbarProvider>
  );
});

Navbar.displayName = "NextUI.Navbar";

export default Navbar;
