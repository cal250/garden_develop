import Typography, {
  TypographyProps,
} from "@/components/atoms/typography/typography";
import { variantClasses } from "@/components/atoms/typography/classes";

const meta = {
  title: "Components/Atoms/Typography",
  component: Typography,
};

export default meta;

export const Default = {
  args: {
    children: "Hello World",
  },
  render: (args: TypographyProps) => <Typography {...args} />,
};

export const Variants = {
  args: {
    children: "Hello World",
  },
  render: (args: TypographyProps) => (
    <div className="flex flex-col gap-4">
      {Object.keys(variantClasses).map((variantClass) => (
        <Typography {...args} variant={variantClass as any} key={variantClass}>
          {variantClass}
        </Typography>
      ))}
    </div>
  ),
};
