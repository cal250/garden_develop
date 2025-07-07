import { HTMLNextUIProps } from "@nextui-org/system";
import { clsx, dataAttr } from "@nextui-org/shared-utils";

import { useNavbarContext } from "./navbar-context";
import React from "react";
import { withPolygon } from "@/components/utils/react/polymorphism";

export interface NavbarMenuItemProps extends HTMLNextUIProps<"li"> {
  /**
   * Whether the item is active or not.
   * @default false
   */
  isActive?: boolean;
  children?: React.ReactNode;
}

const NavbarMenuItem = withPolygon<NavbarMenuItemProps, "li">(
  (Polygon, props) => {
    const { className, children, isActive, ...otherProps } = props;

    const { slots, isMenuOpen, classNames } = useNavbarContext();

    const styles = clsx(classNames?.menuItem, className);

    return (
      <Polygon
        className={slots.menuItem?.({ class: styles })}
        data-active={dataAttr(isActive)}
        data-open={dataAttr(isMenuOpen)}
        {...otherProps}
      >
        {children}
      </Polygon>
    );
  },
  "li",
);

NavbarMenuItem.displayName = "NextUI.NavbarMenuItem";

export default NavbarMenuItem;
