import { createIcon } from "@/components/atoms/icons/utils/create-icon";

export const CloseIcon = createIcon({
  path: <path d="M18 6L6 18M6 6l12 12" />,
  defaultProps: {
    strokeWidth: "2",
    stroke: "currentColor",
  },
});
