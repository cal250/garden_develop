import React from "react";
import { Avatar } from "@/components/atoms/avatar";
import { RegularPolygon } from "@/components/atoms/polygon/regular-polygon";

export const PersonaCard: React.FC<PersonaCardProps> = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Avatar
        polygon={RegularPolygon}
        sides={6}
        rotation={30}
        className="h-[302px] w-[262px]"
        src="/assets/home/persona.png"
      />
      <div className="flex flex-col items-center">
        <p className="text-[28px] font-bold text-[#371B7A]">hildegaard.ai</p>
        <span className="text-md font-bold text-[#1A0A37]">42 wormholes</span>
      </div>
    </div>
  );
};

interface PersonaCardProps {}
