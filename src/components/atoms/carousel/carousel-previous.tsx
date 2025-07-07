import * as React from "react";
import { ChevronLeftIcon } from "@/components/atoms/icons";
import { Button } from "@/components/atoms/button";
import { useCarousel } from "./use-carousel";
import { twMerge } from "tailwind-merge";
import { withPolygon } from "@/components/utils/react/polymorphism";

interface Props {
  hideIcon?: boolean;
  gap?: number;
}

const CarouselPrevious = withPolygon<Props, typeof Button>(
  (
    Polygon,
    {
      className,
      hideIcon,
      gap = 10,
      children = hideIcon ? null : <ChevronLeftIcon className="h-4 w-4" />,
      ...props
    },
    ref,
  ) => {
    const { orientation, scrollPrev, canScrollPrev } = useCarousel();

    return (
      <Polygon
        ref={ref}
        variant="outline"
        className={twMerge(
          "absolute h-8 w-8",
          orientation === "horizontal"
            ? "top-1/2 -translate-x-full -translate-y-1/2"
            : "left-1/2 -translate-x-1/2 -translate-y-full rotate-90",
          className,
        )}
        isDisabled={!canScrollPrev}
        onClick={scrollPrev}
        {...props}
        style={{
          ...props.style,
          left: `${-Math.abs(gap)}px`,
        }}
      >
        {children}
        <span className="sr-only">Previous slide</span>
      </Polygon>
    );
  },
  Button,
);
CarouselPrevious.displayName = "CarouselPrevious";

export default CarouselPrevious;
