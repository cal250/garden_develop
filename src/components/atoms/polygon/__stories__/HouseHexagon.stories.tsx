import { HouseHexagon } from "@/components/atoms/polygon/house-hexagon";

const meta = {
  title: "Components/Atoms/Polygon/HouseHexagon",
  component: HouseHexagon,
};

export default meta;

export const Default = {
  args: {
    style: {
      width: "150px",
      height: "200px",
    },
  },
};

export const RoofWidthAsPixels = {
  args: {
    ...Default.args,
    roofWidth: 50,
  },
};

export const RoofHeightAsPixels = {
  args: {
    ...Default.args,
    roofHeight: 50,
  },
};

export const CollapsedRoof = {
  args: {
    ...Default.args,
    roofAngle: -30,
  },
};

export const MirroredRoof = {
  args: {
    ...Default.args,
    mirrored: true,
  },
};
