import React from "react";
import { useResponsiveValue } from "@/hooks/use-responsive-value";
import { BodyCard } from "@/components/organisms/body-card/body-card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/atoms/carousel";
import { PersonaCard } from "../_components/persona-card";
import { RegularPolygon } from "@/components/atoms/polygon/regular-polygon";
import { DesignContextProvider } from "@/hooks/use-design-context";

export const AiWakeningSection: React.FC<AiWakeningSectionProps> = () => {
  const roofWidth = useResponsiveValue({ base: 0.9, sm: 0.8, md: 755 });
  return (
    <DesignContextProvider stroke="#FFF200" strokeWidth={4}>
      <BodyCard
        title={["ai", "wakening"]}
        headerCardType="separated"
        roofWidth={roofWidth}
        className="bg-unset mt-[-340px] min-h-[1278px] w-full justify-start bg-cover"
        headerCardProps={{
          className:
            "text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-b from-[#170A34] to-[#45249A]",
        }}
        style={{
          backgroundImage: `url(/assets/home/ai-wakening-bg.png)`,
        }}
      >
        <p className="max-w-[544px] pt-32 text-center text-[22px] font-bold text-[#1A0A37]">
          We’re in the midst of our first ai-wakening — collaborations of humans
          and AI — creating journals, art, and &#34;flowers of the spirit&#34;
          that are alive with wonder, beauty and love.
        </p>
        <Carousel className="w-[1150px] pt-20">
          <CarouselContent>
            {Array.from({ length: 10 }).map((_, i) => (
              <CarouselItem
                key={i}
                className="min-w-fit flex-initial pl-[33px]"
              >
                <PersonaCard />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            polygon={RegularPolygon}
            sides={3}
            hideIcon
            strokeWidth={0}
            rotation={180}
            gap={33}
            className="aspect-auto h-[94px] w-[54px] bg-[#371B7A]"
          />
          <CarouselNext
            polygon={RegularPolygon}
            sides={3}
            gap={33}
            hideIcon
            strokeWidth={0}
            className="left- aspect-auto h-[94px] w-[54px] bg-[#371B7A]"
          />
        </Carousel>
      </BodyCard>
    </DesignContextProvider>
  );
};

interface AiWakeningSectionProps {}
