import React, { useEffect } from "react";
import { Rectagon } from "@/components/atoms/polygon/rectagon";
import { Image } from "@/components/atoms/image";
import { YoutubeIcon } from "@/components/atoms/icons";
import BracketedText from "@/components/molecules/bracketed-text/bracketed-text";
import { VideoPlayer } from "../_components/video-player";

export const VideoCard: React.FC<VideoCardProps> = ({
  strokeWidth,
  stroke,
}) => {
  const [isVideoOpen, setIsVideoOpen] = React.useState(false);

  useEffect(() => {
    document.body.style.overflow = isVideoOpen ? "hidden" : "auto";
  }, [isVideoOpen]);

  return (
    <div className="relative mt-[41px]">
      <Image
        polygon={Rectagon}
        className="relative h-auto w-full max-w-[1196px] cursor-pointer"
        stroke={stroke}
        strokeWidth={strokeWidth}
        onClick={() => setIsVideoOpen(true)}
        width={1196}
        height={703}
        isZoomed
        src="/assets/home/video-card-bg.png"
        chamferLength={{
          topLeft: { x: 120, angle: 37.5 },
          topRight: { x: 120, angle: 37.5 },
          bottomLeft: { x: 400, angle: 37.5 },
          bottomRight: { x: 400, angle: 37.5 },
        }}
      ></Image>
      <div className="full pointer-events-none absolute bottom-0 left-0 flex h-[60%] w-full flex-col items-center justify-start">
        <YoutubeIcon className="h-auto w-[157px]" />
        <div className="flex gap-2 text-[42px] font-bold">
          <BracketedText outerText="explore the" />
          <BracketedText outerText="Verse">inner</BracketedText>
        </div>
        <p className="mt-4 max-w-[533px] text-center text-[22px] font-bold">
          We’re entering a new era of{" "}
          <span className="text-color-2">spatial psychology</span>, where dreams
          come alive in 3D landscapes. You can now see, spin, and sprout your
          thoughts, and even do XBT — Expanded Behavioral Therapy.
        </p>
      </div>
      {isVideoOpen && <VideoPlayer onClose={() => setIsVideoOpen(false)} />}
    </div>
  );
};

interface VideoCardProps {
  strokeWidth?: number;
  stroke?: string;
}
