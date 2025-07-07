import React from "react";

import { SegmentData } from "@/components/atoms/polygon/utils";

const Segment: React.FC<SegmentProps> = ({
  content,
  rotation,
  className,
  color,
  height,
  fill,
  onClick,
}) => {
  const textRotation = Math.abs(rotation) >= 90 ? "180deg" : "0deg";

  return (
    <button
      style={{
        display: "flex",
        height,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: fill,
        color,
        transform: `rotate(${textRotation})`,
      }}
      type="button"
      className={className}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export interface SegmentProps extends SegmentData {
  index: number;
  height: number;
  rotation: number;
  onClick?: () => void;
}

export default Segment;
