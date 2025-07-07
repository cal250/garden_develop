import React, { PropsWithChildren } from "react";
import {
  MainNavbar,
  MainNavbarProps,
} from "@/components/organisms/main-navbar/main-navbar";
import { HouseHexagon } from "@/components/atoms/polygon/house-hexagon";
import { useResponsiveValue } from "@/hooks/use-responsive-value";

export const InvertedHouseLayout: React.FC<
  PropsWithChildren<InvertedHouseLayoutProps>
> = ({
  menuItems,
  navEndItem,
  navRightItems,
  navLeftItems,
  strokeWidth = 3,
  Octagon,
  children,
}) => {
  const roofWidth = useResponsiveValue({ base: 0.5 });
  const octagonSize = useResponsiveValue({ base: "95%", sm: "552px" });

  return (
    <div className="relative flex h-full w-full flex-col">
      <HouseHexagon
        className="h-[814px] w-full flex-col justify-start bg-center"
        inverted
        strokeWidth={strokeWidth}
        stroke="rgb(var(--color-5))"
        roofWidth={roofWidth}
        style={{
          backgroundImage: `url(/assets/house-layout/banner-2.jpg)`,
        }}
        borderWidths={["default", "default", "default", 0, 0, 0]}
      >
        <div className="top-0 z-10 w-full bg-black/20">
          <MainNavbar
            strokeWidth={strokeWidth}
            menuItems={menuItems}
            navEndItem={navEndItem}
            navLeftItems={navLeftItems}
            navRightItems={navRightItems}
            pageHasOctagon={Boolean(Octagon)}
          />
        </div>
        {Octagon && (
          <div
            className="z-20 aspect-square self-center"
            style={{ width: octagonSize, marginTop: `-15px` }}
          >
            {Octagon}
          </div>
        )}
        {children}
      </HouseHexagon>
    </div>
  );
};

interface InvertedHouseLayoutProps
  extends Omit<MainNavbarProps, "pageHasOctagon"> {
  Octagon?: React.ReactNode;
}
