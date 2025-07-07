import React from "react";
import { QuoteBlock } from "../types";
import Color from "color";
import { Rectagon } from "@/components/atoms/polygon/rectagon";

export const ViewQuote: React.FC<ViewQuoteProps> = ({ quote, width }) => {
  return (
    <Rectagon
      chamferLength={quote.layout === "bevel" ? { x: 100, angle: 37.5 } : 0}
      className="quote-editor h-full min-h-[238px] w-full"
      strokeWidth={0}
      style={{
        background: quote.isRadialGradient
          ? `radial-gradient(circle, ${Color(quote.background).lighten(0.6)}, ${quote.background})`
          : quote.background,
        maxWidth:
          quote.layout === "full"
            ? "100%"
            : quote.layout === "bevel"
              ? `calc(${typeof width === "number" ? `${width}px` : width} + 140px)`
              : width,
      }}
    >
      <div
        dangerouslySetInnerHTML={{ __html: quote.content }}
        className="tiptap"
      ></div>
    </Rectagon>
  );
};

interface ViewQuoteProps {
  quote: QuoteBlock;
  width: number | string;
}
