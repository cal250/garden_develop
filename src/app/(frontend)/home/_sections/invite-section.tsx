import React from "react";
import { InviteForm } from "../_components/invite-form";

export const InviteSection: React.FC<InviteSectionProps> = (props) => {
  return (
    <div
      className="mt-[-400px] max-h-[1852px] w-full flex-col pb-[486px]"
      style={{
        backgroundImage: `url(/assets/home/invite-bg.png)`,
        backgroundSize: "cover",
        zIndex: 0,
      }}
    >
      <div className="mt-[450px] flex flex-col items-center">
        <h1 className="text-[42px] font-extrabold text-white">
          become a bloomer
        </h1>
        <p className="max-w-[569px] pt-6 text-center text-[22px] font-bold text-white">
          We&#39;re leaping through emotional wormholes, birthing new spiritual
          archetypes, and creating the first 3D map of the ⟨inner⟩Biome.
          Together, we&#39;re rewriting the human story.
        </p>
        <InviteForm />
      </div>
    </div>
  );
};

interface InviteSectionProps {}
