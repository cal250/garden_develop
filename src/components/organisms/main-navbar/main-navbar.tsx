import React from "react";
import { NavMenuItem } from "@/components/templates/house-layout/types";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from "@/components/atoms/navbar";
import { Logo } from "@/components/atoms/logo/logo";
import { Trapezoid } from "@/components/atoms/polygon/trapezoid";
import { twMerge } from "tailwind-merge";
import Link from "next/link";
import clsx from "clsx";
import { Rexagon } from "@/components/atoms/polygon/rexagon";
import { SlotClasses } from "@/components/utils/react/types";

export const MainNavbar: React.FC<MainNavbarProps> = ({
  navEndItem,
  navLeftItems,
  navRightItems,
  menuItems,
  pageHasOctagon,
  strokeWidth,
  classNames,
}) => {
  return (
    <Navbar
      className="items-start bg-transparent"
      isBlurred={false}
      classNames={{
        wrapper: twMerge("max-w-[unset] bg-transparent", classNames?.wrapper),
      }}
    >
      <NavbarContent justify="start">
        <Logo
          className={twMerge("h-auto w-[130px] text-color-3", classNames?.logo)}
        />
        <NavbarContent
          className="hidden flex-grow gap-8 md:flex"
          justify="center"
        >
          {React.Children.toArray(navLeftItems)?.map((item, index) => (
            <NavbarItem key={index}>{item}</NavbarItem>
          ))}
        </NavbarContent>
      </NavbarContent>
      <NavbarContent
        justify="center"
        polygon={Trapezoid}
        inverted
        slopeAngle={48}
        className={clsx(
          "hidden h-[75px] w-[460px] px-20 text-white md:flex lg:w-[560px] lg:gap-16",
          pageHasOctagon
            ? "transparent"
            : "bg-gradient-to-b from-color-3 to-color-8",
        )}
        stroke={pageHasOctagon ? "transparent" : "rgb(var(--color-5))"}
        borderWidths={[0]}
        strokeWidth={strokeWidth}
      >
        {menuItems?.map((menuItem) => (
          <NavbarItem
            key={menuItem.title}
            isActive={menuItem.isActive}
            className={twMerge(
              "cursor-pointer hover:text-color-1",
              menuItem.isActive ? "border-b-2 border-color-2 text-color-2" : "",
            )}
          >
            <Link href={menuItem.href || "#"}>{menuItem.title}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end" className="flex-grow">
        <NavbarContent
          justify="center"
          className="hidden flex-grow gap-8 md:flex"
        >
          {React.Children.toArray(navRightItems)?.map((item, index) => (
            <NavbarItem key={index}>{item}</NavbarItem>
          ))}
        </NavbarContent>
        <NavbarItem className="align-self-end">{navEndItem}</NavbarItem>
        <div>
          <NavbarMenuToggle
            className="h-8 w-16 p-4 md:hidden"
            polygon={Rexagon}
            stroke="rgb(var(--color-9))"
          />
        </div>
      </NavbarContent>
      <NavbarMenu className="bg-primary-700">
        {menuItems?.map((menuItem) => (
          <NavbarItem
            key={menuItem.title}
            isActive={menuItem.isActive}
            className={twMerge(
              "cursor-pointer hover:text-color-1",
              menuItem.isActive ? "text-color-2" : "",
            )}
          >
            <Link href={menuItem.href || "#"}>{menuItem.title}</Link>
          </NavbarItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export interface MainNavbarProps {
  /**
   * The content to display next to the branding
   */
  navLeftItems?: React.ReactNode[] | React.ReactNode;

  /**
   * The content to display at the end of the navbar
   */
  navRightItems?: React.ReactNode[] | React.ReactNode;

  /**
   *
   */
  navEndItem?: React.ReactNode;

  /**
   * The menu items for the navbar
   */
  menuItems?: Array<NavMenuItem>;

  /**
   * The stroke width for the polygons
   */
  strokeWidth?: number;

  /**
   * Whether the page displays an octagon. This alters the style of the menu
   * @default false
   */
  pageHasOctagon?: boolean;

  classNames?: SlotClasses<"logo" | "wrapper">;
}
