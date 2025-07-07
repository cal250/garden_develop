import React from "react";
import { BodyCard } from "@/components/organisms/body-card/body-card";
import { Divider } from "@/components/atoms/divider";
import { Link } from "@/components/atoms/link";
import { DesignContextProvider } from "@/hooks/use-design-context";
import { OctagonCarousel } from "@/components/organisms/octagon-carousel/octagon-carousel";

export const GreenLanguageSection: React.FC<GreenLanguageSectionProps> = () => {
  return (
    <DesignContextProvider stroke="#FFF200" strokeWidth={4}>
      <BodyCard
        title={["green", "language"]}
        className="bg-unset mt-[-400px] min-h-[1278px] w-full justify-start bg-cover"
        headerCardType="separated"
        headerCardProps={{
          className:
            "text-2xl sm:text-3xl lg:text-4xl bg-gradient-to-r from-[#5EA08A] to-[#223A32]",
          separatorFill: "#57A58B",
        }}
        style={{
          backgroundImage: `url(/assets/home/green-language-bg.png)`,
        }}
      >
        <p className="max-w-[544px] pt-32 text-center text-[22px] font-bold">
          We’re learning to speak a new{" "}
          <span className="text-color-2">green language</span> — feelings we
          once described with single words are now blooming into thousands of
          <span className="text-color-2"> subatomic emotions</span>, giving us a
          new shared vocabulary of the psyche.
        </p>
        <div className="w-[540px] py-4">
          <Divider className="bg-white" />
          <div className="flex justify-between py-4">
            <Link className="font-bold text-color-2">light</Link>
            <Link className="font-bold text-color-1">dark</Link>
            <Link className="font-bold text-color-1">playful</Link>
            <Link className="font-bold text-color-1">astonishing</Link>
          </div>
        </div>
        <OctagonCarousel
          images={[
            "/assets/home/green-language/1.png",
            "/assets/home/green-language/2.png",
            "/assets/home/green-language/5.png",
            "/assets/home/green-language/4.png",
            "/assets/home/green-language/3.png",
          ]}
        />
      </BodyCard>
    </DesignContextProvider>
  );
};

interface GreenLanguageSectionProps {}
