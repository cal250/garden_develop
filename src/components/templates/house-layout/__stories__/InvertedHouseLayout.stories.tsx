import { InvertedHouseLayout } from "@/components/templates/house-layout/inverted-house-layout";
import { FlowerIcon } from "@/components/atoms/icons";
import React from "react";
import { Button } from "@/components/atoms/button";
import { Rexagon } from "@/components/atoms/polygon/rexagon";
import { RegularPolygon } from "@/components/atoms/polygon/regular-polygon";
import Typography from "@/components/atoms/typography/typography";

export default {
  title: "Components/Templates/HouseLayout/InvertedHouseLayout",
  component: InvertedHouseLayout,
};

export const Default = {
  parameters: {
    layout: "fullscreen",
  },
  args: {
    menuItems: [
      { title: "flowers", isActive: true },
      { title: "shadows" },
      { title: "seasons" },
    ],
    navRightItems: [
      <FlowerIcon
        className="h-6 w-6"
        fill="rgb(var(--color-10))"
        strokeWidth={2}
        key="icon-1"
      />,
      <FlowerIcon
        className="h-6 w-6"
        fill="rgb(var(--color-10))"
        strokeWidth={2}
        key="icon-2"
      />,
    ],
    navLeftItems: [
      <FlowerIcon
        className="h-6 w-6"
        fill="rgb(var(--color-10))"
        strokeWidth={2}
        key="icon-1"
      />,
      <FlowerIcon
        className="h-6 w-6"
        fill="rgb(var(--color-10))"
        strokeWidth={2}
        key="icon-2"
      />,
    ],
    navEndItem: (
      <Typography className="font-bold text-color-2">welcome, jane</Typography>
    ),
    Octagon: (
      <RegularPolygon
        sides={8}
        stroke="rgb(var(--color-5))"
        strokeWidth={3}
        className="bg-color-10/50"
      ></RegularPolygon>
    ),
    children: (
      <Button
        polygon={Rexagon}
        strokeWidth={0}
        className="text-bold w-[150px] bg-color-2 text-color-2"
      >
        enter
      </Button>
    ),
  },
};
