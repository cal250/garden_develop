import BracketedText from "@/components/molecules/bracketed-text/bracketed-text";

const meta = {
  title: "Components/Molecules/BracketedText",
  component: BracketedText,
};

export default meta;

export const Default = {
  args: {
    className: "font-extrabold text-accent-50",
    variant: "4xl",
    children: "universal",
  },
};

export const WithOuterText = {
  args: {
    ...Default.args,
    outerText: "Bracket",
  },
};

export const OuterTextOnly = {
  args: {
    ...Default.args,
    outerText: "Bracket",
    children: "",
  },
};
