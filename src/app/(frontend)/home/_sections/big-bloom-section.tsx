import React, { useState } from "react";
import { Octagon } from "../_components/octagon";
import { HeaderCard } from "@/components/molecules/header-card/header-card";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
} from "@/components/atoms/icons";
import { Trapezoid } from "@/components/atoms/polygon/trapezoid";
import Typography from "@/components/atoms/typography/typography";
import { Button } from "@/components/atoms/button";
import { RegularPolygon } from "@/components/atoms/polygon/regular-polygon";
import { WellgorithmsTable } from "../_components/wellgorithms-table";
import { motion } from "framer-motion";
import { DesignContextProvider } from "@/hooks/use-design-context";
import { DoubleRightIcon } from "../_components/double-right-icon";
import { useBreakpoints } from "@/hooks/use-breakpoints";
import { HouseHexagon } from "@/components/atoms/polygon/house-hexagon";
import { useResponsiveValue } from "@/hooks/use-responsive-value";

export const BigBloomSection: React.FC<BigBloomSectionProps> = (props) => {
  const [isTableOpen, setIsTableOpen] = useState(false);
  const { isMd } = useBreakpoints();

  const octagonSize = useResponsiveValue({
    base: 350,
    md: 490,
  });
  const tableWidth = useResponsiveValue<string | number>({
    base: "100vw",
    lg: 978,
  });

  return (
    <div className="flex flex-col items-center pt-[100px]">
      <p className="mb-[67px] max-w-[544px] text-center text-[22px] font-bold">
        Amidst all the talk of p⟨doom⟩ — climate anxiety, loneliness, the loss
        of faith in institutions — we’re exploring p⟨bloom⟩. We see a new social
        ecosystem emerging, with minds blooming like gardens, and hearts daring
        to hope again.
      </p>
      <div style={{ width: octagonSize, height: octagonSize }}>
        <Octagon />
      </div>
      <div className="z-20" style={{ marginTop: -0.255 * octagonSize }}>
        <div className="text- flex h-[32px] items-center justify-center text-[16px] font-bold md:h-[48px] md:text-[22px]">
          beta Q3 2025
        </div>
        <div className="flex items-center gap-6">
          <DesignContextProvider stroke="white">
            <HeaderCard
              text="wellgorithms"
              classNames={{
                title: "text-[1.75rem]",
                outerTitle: "text-white",
                base: "bg-[#f469b5] h-[74px]",
                nodes: "h-[50px] bg-[#754C9C]",
              }}
              style={{
                width: (isMd ? 0.85 : 0.9) * octagonSize,
              }}
              withNodes
              leftNodeContent={<ChevronLeftIcon />}
              rightNodeContent={<ChevronRightIcon />}
            />
          </DesignContextProvider>
        </div>
      </div>
      <HouseHexagon
        className="z-10 mt-[-37px] flex h-[110px] w-screen items-end bg-[#3D245B] md:w-[634px]"
        strokeWidth={0}
        roofHeight={isMd ? 0.999 : 0.5}
        roofWidth={octagonSize * 0.85}
      >
        <div className="flex w-[338px] items-center justify-between pb-[21px]">
          <span className="text-[26px] font-extrabold text-color-2">
            profiles
          </span>
          <DoubleRightIcon />
          <span className="text-[26px] font-extrabold text-color-2">
            gardens
          </span>
        </div>
      </HouseHexagon>
      <div
        style={{ width: tableWidth, minHeight: 319 }}
        className="flex h-full flex-col"
      >
        <div className="relative">
          <Trapezoid
            strokeWidth={0}
            as={motion.div}
            style={{ height: 319, width: 1268 }}
            initial={{ opacity: 1 }}
            animate={{ opacity: isTableOpen ? 0 : 1 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            stroke="white"
            className="absolute left-1/2 top-0 h-full w-full -translate-x-1/2 flex-col justify-start bg-gradient-to-b from-color-7 to-color-7/0"
          />
          <Trapezoid
            strokeWidth={isTableOpen && isMd ? 2 : 0}
            borderWidths={[0]}
            style={{
              height: 172,
              backgroundColor:
                isTableOpen && isMd ? "rgb(var(--color-2))" : "transparent",
            }}
            slopeAngle={isMd ? undefined : 0}
            stroke="white"
            className="w-full flex-col justify-start"
            overflow
          >
            <Typography className="w-full max-w-[582px] py-8 text-center text-[18px] font-bold">
              In ⟨inner⟩Garden, growth follows the cycles of nature. You’re not
              locked into a timeline; instead your garden reflects where you are
              in your emotional seasons.
            </Typography>
            <Button
              isIconOnly
              polygon={RegularPolygon}
              sides={8}
              strokeWidth={3}
              stroke="white"
              className="z-10 -mt-6 self-center bg-color-9 text-white md:mt-1"
              onClick={() => setIsTableOpen(!isTableOpen)}
            >
              {isTableOpen ? <CloseIcon /> : <ChevronDownIcon />}
            </Button>
          </Trapezoid>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: isTableOpen ? "auto" : 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            {/* <WellgorithmsTable /> */}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

interface BigBloomSectionProps {}
