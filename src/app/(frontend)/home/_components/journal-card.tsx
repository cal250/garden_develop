import React from "react";
import { HeaderCard } from "@/components/molecules/header-card/header-card";
import { HouseHexagon } from "@/components/atoms/polygon/house-hexagon";
import { Avatar } from "@/components/atoms/avatar";
import { RegularPolygon } from "@/components/atoms/polygon/regular-polygon";
import { Tooltip } from "@/components/atoms/tooltip";
import { Rexagon } from "@/components/atoms/polygon/rexagon";
import { useDesignContext } from "@/hooks/use-design-context";

export const JournalCard: React.FC<JournalCardProps> = () => {
  const { strokeWidth } = useDesignContext();
  return (
    <div className="w-[357px] flex-col">
      <HouseHexagon
        style={{
          bottom: -strokeWidth,
        }}
        roofWidth={0.45}
        borderWidths={["default", "default", "default", "default", 0]}
      >
        <img
          alt="banner"
          src="/assets/home/journal-card-banner.png"
          className="h-[140px] w-full object-cover"
        />
      </HouseHexagon>
      <HeaderCard
        text="Compost"
        bracketText="compassion"
        className="h-[70px] bg-[#627C5E]"
        style={{
          width: `calc(100% + 68px)`,
          left: -34,
        }}
        withNodes
        classNames={{
          title: "text-[28px]",
          leftNode: "bg-[#FBFCAF]",
          rightNode: "bg-[#FBFCAF]",
        }}
      />
      <HouseHexagon
        strokeWidth={strokeWidth}
        roofWidth={0.7}
        inverted
        className="h-[140px] items-start bg-[#D0E0D2]"
        borderWidths={[0, "default", "default", "default", "default"]}
      >
        <p className="px-10 py-6 text-[14px] font-bold text-[#1A3B32]">
          AI flows like water through pipes, but where does it lead? Toward
          profit? Toward data accumulation?
        </p>
      </HouseHexagon>
      <Tooltip
        content="Moses Gitau"
        polygon={Rexagon}
        className="h-[55px] w-[200px] bg-color-2 text-[13px] font-bold text-color-8"
        tipAngle={120}
        classNames={{
          base: "before:w-[40px] before:h-[40px] before:bg-color-2",
        }}
        strokeWidth={0}
        showArrow
        placement="bottom"
      >
        <Avatar
          src="/assets/home/avatar.png"
          polygon={RegularPolygon}
          className="mt-[-37px] h-[74px] w-[74px] justify-self-center"
          sides={8}
        />
      </Tooltip>
    </div>
  );
};

interface JournalCardProps {}
