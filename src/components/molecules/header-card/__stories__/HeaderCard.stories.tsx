import { HeaderCard } from "@/components/molecules/header-card/header-card";
import { Trapezoid } from "@/components/atoms/polygon/trapezoid";

const meta = {
  title: "Components/Molecules/HeaderCard",
  component: HeaderCard,
};

export default meta;

export const Default = {
  args: {
    text: "Template",
    className: "min-w-[500px] px-8",
    strokeWidth: 3,
    stroke: "white",
  },
};

export const WithBracketText = {
  args: {
    ...Default.args,
    bracketText: "Bracket",
  },
};

export const WithNodes = {
  args: {
    ...Default.args,
    withNodes: true,
  },
};

export const WithNodeContent = {
  args: {
    ...Default.args,
    withNodes: true,
    leftNodeContent: <span>{"<<"}</span>,
    rightNodeContent: <span>{">>"}</span>,
  },
};

export const TrapezoidHeaderCard = {
  args: {
    ...Default.args,
    polygon: Trapezoid,
  },
};

export const WithSeparator = {
  args: {
    ...Default.args,
    stroke: "yellow",
    textType: "separated",
    text: ["With", "Separator"],
  },
};
