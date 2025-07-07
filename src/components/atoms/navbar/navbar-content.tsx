import { HTMLNextUIProps } from "@nextui-org/system";
import { clsx } from "@nextui-org/shared-utils";

import { useNavbarContext } from "./navbar-context";
import { withPolygon } from "@/components/utils/react/polymorphism";
import React from "react";

export interface NavbarContentProps extends HTMLNextUIProps<"ul"> {
  /**
   * The content of the Navbar.Content. It is usually the `NavbarItem`,
   */
  children?: React.ReactNode | React.ReactNode[];
  /**
   * The justify of the content
   * @default start
   */
  justify?: "start" | "end" | "center";
}

const NavbarContent = withPolygon<NavbarContentProps, "ul">(
  (Polygon, props) => {
    const { className, children, justify = "start", ...otherProps } = props;

    const { slots, classNames } = useNavbarContext();

    const styles = clsx(classNames?.content, className);

    return (
      <Polygon
        className={slots.content?.({ class: styles })}
        data-justify={justify}
        {...otherProps}
      >
        {children}
      </Polygon>
    );
  },
  "ul",
);

NavbarContent.displayName = "NextUI.NavbarContent";

export default NavbarContent;
