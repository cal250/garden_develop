import React from "react";
import { BodyCard } from "@/components/organisms/body-card/body-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/atoms/carousel";
import { WellgorithmCard } from "../_components/wellgorithm-card";
import { DesignContextProvider } from "@/hooks/use-design-context";

export const WellgorithmsFeedSection: React.FC<
  WellgorithmsFeedSectionProps
> = () => {
  return (
    <DesignContextProvider stroke="#C6AED4" strokeWidth={3}>
      <BodyCard
        title="Wellgorithms"
        className="bg-unset mt-[-400px] min-h-[1278px] w-full justify-start bg-cover"
        headerCardProps={{
          className:
            "text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-t from-[#352E62] to-[#585090]",
        }}
        style={{
          backgroundImage: `url(/assets/home/wellgorithms-bg.png)`,
        }}
      >
        <p className="max-w-[544px] pt-[93px] text-center text-[22px] font-bold">
          Wellgorithms are like open-source software for the soul —
          nature-inspired practices that can be branched, forked, debugged and
          compiled in a shared repository of spiritual and emotional wisdom.
        </p>
        <Carousel className="h-[200px] w-full flex-1 pt-[81px]">
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, i) => (
              <CarouselItem
                key={i}
                className="min-w-fit flex-initial pl-[60px]"
              >
                <WellgorithmCard />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </BodyCard>
    </DesignContextProvider>
  );
};

interface WellgorithmsFeedSectionProps {}
