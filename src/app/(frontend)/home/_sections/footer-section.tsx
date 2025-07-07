import React from "react";
import { DesignContextProvider } from "@/hooks/use-design-context";
import { BodyCard } from "@/components/organisms/body-card/body-card";
import BracketedText from "@/components/molecules/bracketed-text/bracketed-text";
import { Logo } from "@/components/atoms/logo/logo";
import { Trapezoid } from "@/components/atoms/polygon/trapezoid";

const links = [
  "Garden 🌱",
  "DNA 🧬",
  "Blome 🌿",
  "Nature 🦋",
  "Health ❤",
  "Verse 🕶",
  "Rights ⚓",
  "Bullshit 🤮",
];

export const FooterSection: React.FC<FooterSectionProps> = (props) => {
  return (
    <DesignContextProvider stroke="#C6AED4" strokeWidth={4}>
      <BodyCard
        className="mt-[-400px] min-h-[544px] w-full justify-start pt-[40px]"
        style={{
          backgroundImage: `url(/assets/home/footer-bg.png)`,
          backgroundSize: "contain",
        }}
      >
        <p className="max-w-[569px] text-[18px] font-bold">
          <BracketedText className="text-color-2">inner</BracketedText> rose
          from the ashes of trauma, homelessness, and a near death experience.
          Our mission is to spark a Big Bloom of human flourishing, with a new
          green language, a new emotional toolkit, and a new 3D map the psyche.
        </p>
        <div className="grid grid-cols-4 pt-[47px]">
          {links.map((link, index) => (
            <BracketedText
              key={index}
              className="text-[18px] font-bold"
              outerText={link}
            >
              inner
            </BracketedText>
          ))}
        </div>
        <Logo className="mt-[58px] h-[122px] w-[436px] text-color-2" />
        <Trapezoid
          className="mt-[50px] h-[80px] w-[829px] bg-black"
          borderWidths={[0]}
          strokeWidth={2}
        >
          <div className="flex gap-6 text-[15px] font-bold">
            <span>about</span>
            <span>contact</span>
            <span>faq</span>
            <span>policies</span>
            <span>privacy</span>
          </div>
        </Trapezoid>
      </BodyCard>
    </DesignContextProvider>
  );
};

interface FooterSectionProps {}
