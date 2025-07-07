import { MainNavbar } from "@/components/organisms/main-navbar/main-navbar";
import { FlowerIcon } from "@/components/atoms/icons";
import Typography from "@/components/atoms/typography/typography";
import React from "react";

const meta = {
  title: "Components/Organisms/MainNavbar",
  component: MainNavbar,
};

export default meta;

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
  },
};

export const WithOctagonInPage = {
  ...Default,
  args: {
    ...Default.args,
    pageHasOctagon: true,
  },
};
