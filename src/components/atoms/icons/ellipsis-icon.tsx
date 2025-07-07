import { createIcon } from "@/components/atoms/icons/utils/create-icon";

export const EllipsisIcon = createIcon({
  path: (
    <>
      <circle cx="12" cy="12" fill="currentColor" r="1" />
      <circle cx="19" cy="12" fill="currentColor" r="1" />
      <circle cx="5" cy="12" fill="currentColor" r="1" />
    </>
  ),
  defaultProps: {
    strokeLinecap: "round",
    strokeLinejoin: "round",
    strokeWidth: "1.5",
    shapeRendering: "geometricPrecision",
  },
});
