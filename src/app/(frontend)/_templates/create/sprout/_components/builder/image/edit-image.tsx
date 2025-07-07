import React from "react";
import { ImageBlock } from "../types";
import { UploadIcon } from "../../icons";
import { HouseHexagon } from "@/components/atoms/polygon/house-hexagon";
import { Input } from "@/components/atoms/input";
import { SearchIcon } from "@/components/atoms/icons";
import { Button } from "@/components/atoms/button";
import { RegularPolygon } from "@/components/atoms/polygon/regular-polygon";
import { BoxSizeChooser } from '../common/box-size-chooser'
import { ImageChooser } from './image-chooser'

export const EditImage: React.FC<EditImageProps> = ({
  image,
  onImageChanged,
}) => {
  return (
    <HouseHexagon
      roofWidth={0.8}
      inverted
      className="min-h-[557px] w-[822px] flex-col justify-start gap-8 bg-[#8858B5AB] p-8 pb-32"
      strokeWidth={0}
    >
      <div className="flex w-full justify-between">
        <button className="p-0">
          <UploadIcon className="h-[30px] w-auto" />
        </button>
        <Input
          startContent={<SearchIcon />}
          placeholder="search by keyword"
          variant="underlined"
          className="w-full max-w-[300px]"
          classNames={{
            input:
              "border-b-white placeholder:text-white placeholder:text-center",
            inputWrapper:
              "after:bg-white border-b-white border-b-1 shadow-none hover:border-b-white",
          }}
        />
        <Button
          isIconOnly
          polygon={RegularPolygon}
          sides={6}
          strokeWidth={3}
          className="min-w-[40px]"
        >
          <span className="text-[24px] font-bold text-color-2">x</span>
        </Button>
      </div>
      <BoxSizeChooser
        layout={image.layout}
        onLayoutChange={(layout) => onImageChanged({ layout })}
      />
      <ImageChooser
        onChooseImage={(src) => onImageChanged({ content: src })}
        image={image.content}
        layout={image.layout}
      />
    </HouseHexagon>
  );
};

interface EditImageProps {
  image: ImageBlock;
  onImageChanged: (image: Partial<ImageBlock>) => void;
}
