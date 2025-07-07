import React from "react";
import { Layout } from "../types";
import { twMerge } from "tailwind-merge";

export const BoxSizeChooser: React.FC<BoxSizeChooserProps> = ({
  layout,
  onLayoutChange,
}) => {
  return (
    <div className="flex items-center gap-6 p-4">
      <button
        className={twMerge(
          "h-6 w-8 bg-white",
          layout === "inline" ? "bg-color-2" : "",
        )}
        onClick={() => onLayoutChange("inline")}
      />
      <button className="" onClick={() => onLayoutChange("bevel")}>
        <svg
          width="61"
          height="27"
          viewBox="0 0 61 27"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0.25 6.75L7.75 0H15.25H30.25H45.25H52.75L60.25 6.75V13.5V20.25L52.75 27H45.25H30.25H15.25H7.75L0.25 20.25V13.5V6.75Z"
            fill={layout === "bevel" ? "#FFF200" : "#FFFFFF"}
          />
        </svg>
      </button>
      <button
        onClick={() => onLayoutChange("full")}
        className={twMerge(
          "h-6 w-16 bg-white",
          layout === "full" ? "bg-color-2" : "",
        )}
      ></button>
    </div>
  );
};

export interface BoxSizeChooserProps {
  layout: Layout;
  onLayoutChange: (layout: Layout) => void;
}
