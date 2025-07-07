import React from "react";
import { BodyCard } from "@/components/organisms/body-card/body-card";
import { JournalCard } from "../_components/journal-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/atoms/carousel";
import { DesignContextProvider } from "@/hooks/use-design-context";

export const JournalsSection: React.FC<JournalSectionProps> = () => {
  return (
    <DesignContextProvider stroke="#D0E0D2" strokeWidth={3}>
      <BodyCard
        title="gardeners of the psyche"
        className="bg-unset mt-[80px] min-h-[1278px] w-full justify-start bg-cover"
        headerCardProps={{
          className:
            "text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-t from-[#2F5330] to-[#6DAD6E]",
        }}
        style={{
          backgroundImage: `url(/assets/home/gardeners-bg.png)`,
        }}
      >
        <p className="max-w-[544px] pt-32 text-center text-[22px] font-bold">
          A new kind of hero is blossoming — the master of the world within. The
          friend who lights a lantern in the darkness. The neighbor who plucks
          the weeds of worry. The partner who plants the seeds of joy and peace.
        </p>

        <Carousel className="h-[200px] w-full flex-1 pt-20">
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, i) => (
              <CarouselItem
                key={i}
                className="min-w-fit flex-initial pl-[60px]"
              >
                <JournalCard />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </BodyCard>
    </DesignContextProvider>
  );
};

interface JournalSectionProps {}
