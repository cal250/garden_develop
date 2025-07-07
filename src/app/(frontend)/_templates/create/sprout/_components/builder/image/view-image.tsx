import React from "react";
import { ImageBlock } from "../types";
import { Rectagon } from "@/components/atoms/polygon/rectagon";
import { Image } from "@/components/atoms/image";

export const ViewImage: React.FC<ViewImageProps> = ({ image, width }) => {
  return (
    <Image
      polygon={Rectagon}
      chamferLength={image.layout === "bevel" ? { x: 100, angle: 37.5 } : 0}
      src={image.content}
      className="h-[400px] w-full"
      classNames={{
        img: "object-cover",
      }}
      strokeWidth={0}
      style={{
        maxWidth:
          image.layout === "full"
            ? "100%"
            : image.layout === "bevel"
              ? `calc(${typeof width === "number" ? `${width}px` : width} + 140px)`
              : width,
      }}
    />
  );
};

interface ViewImageProps {
  image: ImageBlock;
  width: string | number;
}
