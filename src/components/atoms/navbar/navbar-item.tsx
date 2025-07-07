import { HTMLNextUIProps } from "@nextui-org/system";
import { clsx, dataAttr } from "@nextui-org/shared-utils";

import { useNavbarContext } from "./navbar-context";
import React from "react";
import { withPolygon } from "@/components/utils/react/polymorphism";

export interface NavbarItemProps extends HTMLNextUIProps<"li"> {
  children?: React.ReactNode;
  /**
   * Whether the item is active or not.
   * @default false
   */
  isActive?: boolean;
}

const NavbarItem = withPolygon<NavbarItemProps, "li">((Polygon, props) => {
  const { className, children, isActive, ...otherProps } = props;

  const { slots, classNames } = useNavbarContext();

  const styles = clsx(classNames?.item, className);

  return (
    <Polygon
      className={slots.item?.({ class: styles })}
      data-active={dataAttr(isActive)}
      {...(otherProps as any)}
    >
      {children}
    </Polygon>
  );
}, "li");

NavbarItem.displayName = "NextUI.NavbarItem";

export default NavbarItem;
