import useEmblaCarousel from "embla-carousel-react";
import { createContext } from "@/components/utils/react/context";
import { CarouselProps } from "@/components/atoms/carousel/carousel";

type CarouselContextProps = {
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  api: ReturnType<typeof useEmblaCarousel>[1];
  scrollPrev: () => void;
  scrollNext: () => void;
  canScrollPrev: boolean;
  canScrollNext: boolean;
} & CarouselProps;

export const [CarouselProvider, useCarouselContext] =
  createContext<CarouselContextProps>({
    name: "CarouselContext",
    strict: true,
  });
