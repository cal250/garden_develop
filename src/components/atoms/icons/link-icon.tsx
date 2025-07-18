import { createIcon } from "@/components/atoms/icons/utils/create-icon";

export const LinkIcon = createIcon({
  path: (
    <>
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14L21 3" />
    </>
  ),
  defaultProps: {
    shapeRendering: "geometricPrecision",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.5",
  },
});
