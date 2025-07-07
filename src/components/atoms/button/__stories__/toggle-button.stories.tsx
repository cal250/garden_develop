import { ToggleButtonProps } from "@/components/atoms/button/toggle-button";
import { useState } from "react";
import { ToggleButton } from "@/components/atoms/button";

const meta = {
  title: "Components/Atoms/ToggleButton",
  component: ToggleButton,
};

export default meta;

const Template = (args: ToggleButtonProps) => {
  const [isSelected, setSelected] = useState(false);

  return (
    <ToggleButton
      {...args}
      isSelected={isSelected}
      onPress={() => setSelected(!isSelected)}
    >
      <span className="text-black">
        {isSelected ? "Selected" : "Not Selected"}
      </span>
    </ToggleButton>
  );
};

export const Default = {
  args: {
    className: "group-data-[selected=true]:bg-accent-500",
  },
  render: Template,
};
