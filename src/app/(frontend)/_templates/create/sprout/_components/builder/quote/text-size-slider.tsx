import React from "react";
import { Slider } from "@/components/atoms/slider";

const Thumb: React.FC<ThumbProps> = (props) => {
  return (
    <svg
      width="45"
      height="48"
      viewBox="0 0 45 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_15922_6649)">
        <path
          d="M16.5078 24.5128C17.0235 27.632 20.1341 29.9131 23.2606 29.3962C26.387 28.8794 28.5534 25.8622 28.1042 22.732C27.655 19.6018 24.5444 17.3207 21.407 17.7712C18.2141 18.299 15.9812 21.3272 16.5078 24.5128ZM35.887 21.4453C41.0501 22.5008 42.9826 26.7493 41.9347 30.3316C40.7305 34.6215 37.0705 36.0447 31.1325 34.4356C31.5994 40.1537 29.9207 43.2266 25.7519 44.0522C21.5831 44.8777 18.8825 42.597 17.1524 36.6786C15.0429 38.8001 12.5584 39.8926 9.55609 39.0935C7.83892 38.6275 6.51059 37.6198 5.58207 36.137C3.3602 32.6181 4.44168 28.8257 8.6585 25.8105C5.76661 25.2659 3.68531 23.8373 2.62581 21.1489C1.94143 19.4893 2.06625 17.7642 2.74517 16.0838C4.35881 12.2035 7.99614 11.0567 13.435 12.9529C12.6306 10.1542 12.7568 7.61063 14.7112 5.37847C15.8661 4.09666 17.3638 3.23543 19.1152 3.08224C23.4164 2.64388 25.9949 5.01298 27.138 10.6875C28.9814 8.61004 31.1998 7.56148 33.9258 7.92898C35.8096 8.16298 37.26 9.08226 38.399 10.5984C41.1531 14.0294 40.2602 17.7224 35.887 21.4453Z"
          fill="#100E1A"
        />
        <path
          d="M23.6766 29.461C26.983 28.9144 29.2212 25.7971 28.6759 22.4983C28.1305 19.1996 25.008 16.9685 21.7016 17.5151C18.3952 18.0618 16.1569 21.1791 16.7023 24.4778C17.2477 27.7766 20.3702 30.0077 23.6766 29.461Z"
          fill="#F6AA22"
          stroke="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_15922_6649">
          <rect
            width="38.1342"
            height="41.5239"
            fill="white"
            transform="translate(0 6.21973) rotate(-9.38743)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

interface ThumbProps {}

export const TextSizeSlider: React.FC<TextSizeSliderProps> = ({
  fontSize,
  onFontSizeChange,
}) => {
  return (
    <Slider
      label="text size"
      classNames={{
        base: "w-[338px]",
        track: "border-s-[#FFFFFF] h-[8px]",
        filler: "bg-gradient-to-r from-[#FFFFFF] to-[#FFF200]",
        labelWrapper: "justify-center",
        label: "text-[20px] font-bold leading-12 text-black",
      }}
      minValue={14}
      maxValue={48}
      value={fontSize}
      onChange={(value) => onFontSizeChange(value as number)}
      renderValue={() => null}
      renderThumb={(props) => (
        <div {...props} className="top-1/2">
          <Thumb />
        </div>
      )}
    ></Slider>
  );
};

interface TextSizeSliderProps {
  fontSize?: number;
  onFontSizeChange: (fontSize: number) => void;
}
