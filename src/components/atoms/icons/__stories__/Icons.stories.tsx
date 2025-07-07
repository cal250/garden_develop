import { Icon, IconProps } from "@/components/atoms/icons/utils/icon";
import * as icons from "../index";

const meta = {
  title: "Components/Atoms/Icons",
  component: Icon,
};

export default meta;

export const AllIcons = {
  args: {
    className: "w-20 h-20",
  },
  render: (args: IconProps) => (
    <div className="grid grid-cols-4 gap-4">
      {Object.entries(icons).map(([IconName, Icon]) => (
        <div key={IconName} className="flex flex-col items-center gap-4">
          <Icon {...(args as any)} />
          <span className="text-sm">{IconName}</span>
        </div>
      ))}
    </div>
  ),
};
