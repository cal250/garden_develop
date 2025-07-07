import React from "react";
import { Image } from "@/components/atoms/image";
import { Layout } from "../types";
import { Rectagon } from "@/components/atoms/polygon/rectagon";

const images = [
  "/assets/storybook/apple-event.jpeg",
  "/assets/storybook/bicycle.jpeg",
  "/assets/storybook/relaxing.jpeg",
  "/assets/storybook/local-image-1.jpeg",
] as const;

export const ImageChooser: React.FC<ImageChooserProps> = ({
  onChooseImage,
  image: selectedImage,
  layout,
}) => {
  return (
    <div className="grid max-h-[400px] grid-cols-3 gap-6 overflow-x-hidden overflow-y-scroll">
      {images.map((image, index) => (
        <Image
          stroke={selectedImage === image ? "#FFF200" : "#825FA3"}
          key={index}
          polygon={Rectagon}
          chamferLength={layout === "bevel" ? 40 : 0}
          src={image}
          className="h-[118px] w-[166px] cursor-pointer"
          classNames={{
            img: "object-cover",
          }}
          width={166}
          height={118}
          onClick={() => onChooseImage(image)}
        />
      ))}
    </div>
  );
};

interface ImageChooserProps {
  onChooseImage: (image: string) => void;
  image?: string;
  layout: Layout;
}
