import {
  StepIndicatorProps,
  Stepper,
} from "@/components/molecules/stepper/stepper";
import { RegularPolygon } from "@/components/atoms/polygon/regular-polygon";
import { dataAttr } from "@/components/utils/assertion";

const meta = {
  title: "Components/Molecules/Stepper",
  component: Stepper,
};

export default meta;

export const Default = {
  args: {
    numSteps: 10,
    value: 5,
  },
};

export const WithCircleIndicator = {
  ...Default,
  args: {
    ...Default.args,
    stepIndicator: ({ isComplete }: StepIndicatorProps) => {
      return (
        <div
          className={`h-8 w-8 rounded-full ${isComplete ? "bg-yellow-500" : "bg-white"}`}
        />
      );
    },
  },
};

export const WithGapIndicator = {
  ...Default,
  args: {
    ...Default.args,
    stepIndicator: ({ isComplete, step }: StepIndicatorProps) => {
      return (
        <RegularPolygon
          sides={6}
          data-complete={dataAttr(isComplete)}
          className="h-10 text-white data-[complete=true]:bg-color-2 data-[complete=true]:text-black"
          stroke="var(--color-9--80)"
        >
          {step}
        </RegularPolygon>
      );
    },
    gapIndicator: ({ isComplete }: any) => {
      return (
        <div
          className={`h-[2px] w-8 ${isComplete ? "bg-[yellow]" : "bg-white"}`}
        />
      );
    },
  },
};

export const HighlightOnlyCurrentStep = {
  ...Default,
  args: {
    ...Default.args,
    stepIndicator: ({ isCurrentStep, step }: StepIndicatorProps) => {
      return (
        <RegularPolygon
          sides={6}
          data-current={dataAttr(isCurrentStep)}
          className="h-10 text-white data-[current=true]:bg-color-2 data-[current=true]:text-black"
          stroke="var(--color-9--80)"
        >
          {step}
        </RegularPolygon>
      );
    },
    gapIndicator: () => {
      return <div className={`h-[2px] w-8 bg-white`} />;
    },
  },
};
