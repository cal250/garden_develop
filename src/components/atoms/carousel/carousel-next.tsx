import * as React from "react";
import { Button } from "@/components/atoms/button";
import { useCarousel } from "@/components/atoms/carousel/use-carousel";
import { withPolygon } from "@/components/utils/react/polymorphism";
import { ChevronRightIcon } from "@/components/atoms/icons";
import { twMerge } from "tailwind-merge";

interface Props {
  hideIcon?: boolean;
  gap?: number;
}

const CarouselNext = withPolygon<Props, typeof Button>(
  (
    Polygon,
    {
      className,
      hideIcon,
      gap = 10,
      children = hideIcon ? null : <ChevronRightIcon className="h-4 w-4" />,
      ...props
    },
    ref,
  ) => {
    const { orientation, scrollNext, canScrollNext } = useCarousel();

    return (
      <Polygon
        ref={ref}
        variant="outline"
        className={twMerge(
          "absolute h-8 w-8",
          orientation === "horizontal"
            ? "top-1/2 -translate-y-1/2"
            : "right-1/2 -translate-x-1/2 translate-y-full",
          className,
        )}
        isDisabled={!canScrollNext}
        onClick={scrollNext}
        {...props}
        style={{
          ...props.style,
          left: `calc(100% + ${Math.abs(gap)}px)`,
        }}
      >
        {children}
        <span className="sr-only">Next</span>
      </Polygon>
    );
  },
  Button,
);
CarouselNext.displayName = "CarouselNext";

export default CarouselNext;
