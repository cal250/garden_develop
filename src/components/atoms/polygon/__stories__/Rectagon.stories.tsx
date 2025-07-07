import { Rectagon } from "@/components/atoms/polygon/rectagon";

const meta = {
  title: "Components/Atoms/Polygon/Rectagon",
  component: Rectagon,
};

export default meta;

export const Default = {
  args: {
    style: {
      width: "400px",
      height: "400px",
    },
  },
};

export const ChamferLengthAsPixels = {
  args: {
    ...Default.args,
    chamferLength: 50,
  },
};

export const DifferentCutForXAndY = {
  args: {
    ...Default.args,
    chamferLength: { x: 50, y: 200 },
  },
};

export const CutCornersDifferently = {
  args: {
    ...Default.args,
    chamferLength: {
      topLeft: { x: 50, y: 200 },
      topRight: { x: 200, y: 50 },
      bottomLeft: { x: 200, y: 50 },
      bottomRight: { x: 50, y: 200 },
    },
  },
};

export const CutWithAngle = {
  args: {
    ...Default.args,
    chamferLength: {
      x: 40,
      angle: 60,
    },
  },
};
