import React from "react";
import { BodyCard } from "@/components/organisms/body-card/body-card";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/atoms/icons";
import { Trapezoid } from "@/components/atoms/polygon/trapezoid";
import { SmoothCounter } from "@/components/atoms/smooth-counter";
import { VideoCard } from "../_components/video-card";
import {
  DesignContextProvider,
  useDesignContext,
} from "@/hooks/use-design-context";

export const GratitonsSection: React.FC<GratitonsSectionProps> = () => {
  const { designAngle } = useDesignContext();
  return (
    <DesignContextProvider stroke="#88A376" strokeWidth={4}>
      <BodyCard
        title="Gratitons"
        mirrored
        className="bg-unset via-unset mt-[-505px] min-h-[1260px] w-full justify-start from-[#475836] to-[#799957]"
        style={{
          background:
            "radial-gradient(46.91% 52.06% at 49.97% 47.94%, #618E7F 42.61%, #264038 99.68%)",
        }}
        borderWidths={[
          "default",
          "default",
          "default",
          0,
          "default",
          "default",
          "default",
          0,
        ]}
        headerCardProps={{
          className: "b-[#223A32]",
          separatorFill: "#57A58B",
          withNodes: true,
          classNames: {
            nodes: "bg-[#EFAF42] h-[83px]",
            name: "text-[36px] ",
          },
          style: {
            width: "516px",
            background:
              "radial-gradient(46.44% 82.08% at 49.97% 47.94%, #618E7F 3.4%, #264038 99.68%)",
          },
          leftNodeContent: <ChevronLeftIcon className="h-[40px]" />,
          rightNodeContent: <ChevronRightIcon className="h-[40px]" />,
        }}
      >
        <p className="max-w-[591px] pt-[68px] text-center text-[22px] font-bold">
          &#34;Gratitons&#34; by Sophia — Particles of gratitude that ripple
          through your emotional system, bringing joy and warmth.
        </p>
        <div className="mt-[82px] flex w-[823px] gap-[36px]">
          <div className="flex flex-1 flex-col gap-[10px] text-center">
            <SmoothCounter
              value={712}
              polygon={Trapezoid}
              strokeWidth={6}
              duration={4000}
              slopeAngle={{ left: 90 - designAngle }}
              className="h-[119px] bg-[#F8771B] pl-20 text-[60px] font-extrabold"
            />
            <span className="pl-20 text-[20px] font-bold text-color-2">
              new words this week
            </span>
          </div>
          <div className="flex flex-1 flex-col gap-[10px] text-center">
            <SmoothCounter
              value={8712}
              polygon={Trapezoid}
              strokeWidth={6}
              frequency={10}
              duration={4000}
              slopeAngle={{ right: 90 - designAngle }}
              className="h-[119px] bg-[#F8771B] pr-20 text-[60px] font-extrabold"
            />
            <span className="pr-20 text-[20px] font-bold text-color-2">
              new words this week
            </span>
          </div>
        </div>
        <VideoCard />
      </BodyCard>
    </DesignContextProvider>
  );
};

interface GratitonsSectionProps {}
