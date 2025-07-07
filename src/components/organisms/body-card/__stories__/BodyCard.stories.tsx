import { BodyCard, BodyCardProps } from "@/components/organisms/body-card/body-card";
import { twMerge } from "tailwind-merge";

const meta = {
  title: "Components/Organisms/BodyCard",
  component: BodyCard,
};

export default meta;

const Template = (args: BodyCardProps) => (
  <div className="mt-[200px] h-[1200px] w-full">
    <BodyCard {...args} className={twMerge("h-full w-full", args.className)} />
  </div>
);

export const Default = {
  parameters: {
    layout: "fullscreen",
  },
  args: {
    title: "Template",
    roofAngle: 40,
    bracketTitle: "universal",
    children: (
      <span className="flex h-[200px] items-center justify-center bg-white">
        The content goes here
      </span>
    ),
  },
  render: Template,
};

export const WithHeaderCardNodes = {
  ...Default,
  args: {
    ...Default.args,
    headerCardProps: {
      withNodes: true,
    },
  },
};

export const WithTrapezoidHeaderCard = {
  ...Default,
  args: {
    ...Default.args,
    headerCardType: "trapezoid",
  },
};
