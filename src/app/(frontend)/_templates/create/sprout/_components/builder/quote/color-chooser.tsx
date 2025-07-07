import React, { PropsWithChildren } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/atoms/popover";
import { Button } from "@/components/atoms/button";
import { CheckIcon } from "@/components/atoms/icons";
import { colors } from '@/components/utils/wysiwyg'

export const RadialCheckbox: React.FC<RadialCheckboxProps> = ({ checked }) => {
  return (
    <svg
      width="24"
      height="22"
      viewBox="0 0 24 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {checked && (
        <path
          d="M9.81353 14.1007L6.96873 11.302L6 12.2483L9.81353 16L18 7.94631L17.0381 7L9.81353 14.1007Z"
          fill="currentColor"
        />
      )}
      <path
        d="M17.567 1.3577L23.134 11L17.567 20.6423L6.43301 20.6423L0.866025 11L6.43301 1.35769L17.567 1.3577Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
};

interface RadialCheckboxProps {
  checked?: boolean;
}

export const ColorChooser: React.FC<PropsWithChildren<ColorChooserProps>> = ({
  children,
  color: selectedColor,
  onColorChange,
  isRadial,
  onRadialChange,
}) => {
  return (
    <div>
      <Popover placement="bottom">
        <PopoverTrigger className="h-full flex-1">{children}</PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-6 px-4 py-6">
            <div className="grid grid-cols-8 gap-2">
              {colors.map((color) => (
                <Button
                  key={color.label}
                  isIconOnly
                  className="size-6 min-w-0 rounded-sm p-0"
                  onPress={() => onColorChange(color.value)}
                  style={{
                    background: color.value,
                    padding: 0,
                  }}
                >
                  {selectedColor === color.value && (
                    <CheckIcon
                      className={`${color.label.toLowerCase() === "white" ? "text-black" : ""}`}
                    />
                  )}
                </Button>
              ))}
            </div>
            {onRadialChange && (
              <button
                className="flex cursor-pointer items-center gap-2 text-[20px] font-bold text-[#F2EB2E]"
                onClick={() => onRadialChange(!isRadial)}
              >
                <RadialCheckbox checked={isRadial} />
                <span>radial</span>
              </button>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

interface ColorChooserProps {
  onColorChange: (color: string) => void;
  color?: string;
  isRadial?: boolean;
  onRadialChange?: (radial: boolean) => void;
}
