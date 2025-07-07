import React from "react";
import { Meta } from "@storybook/react";
import { button, buttonGroup } from "@nextui-org/theme";

import { Button, ButtonGroup, ButtonGroupProps } from "../index";
import { HouseHexagon } from "@/components/atoms/polygon/house-hexagon";
import { Trapezoid } from "@/components/atoms/polygon/trapezoid";

export default {
  name: "Components/Atoms/ButtonGroup",
  component: ButtonGroup,
  argTypes: {
    variant: {
      control: {
        type: "select",
      },
      options: ["solid", "bordered", "light", "flat", "shadow", "ghost"],
    },
    color: {
      control: {
        type: "select",
      },
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
      ],
    },
    radius: {
      control: {
        type: "select",
      },
      options: ["none", "sm", "md", "lg", "full"],
    },
    size: {
      control: {
        type: "select",
      },
      options: ["sm", "md", "lg"],
    },
    fullWidth: {
      control: {
        type: "boolean",
      },
    },
    isDisabled: {
      control: {
        type: "boolean",
      },
    },
    disableAnimation: {
      control: {
        type: "boolean",
      },
    },
  },
} as Meta<typeof ButtonGroup>;

const defaultProps = {
  ...button.defaultVariants,
  ...buttonGroup.defaultVariants,
};

const Template = (args: ButtonGroupProps) => (
  <ButtonGroup {...args}>
    <Button polygon={HouseHexagon} rotation={-90} roofAngle={20}>
      One
    </Button>
    <Button polygon={Trapezoid} slopeAngle={0}>
      Two
    </Button>
    <Button polygon={HouseHexagon} rotation={90} roofAngle={20}>
      Three
    </Button>
  </ButtonGroup>
);

export const Default = {
  render: Template,

  args: {
    ...defaultProps,
  },
};
