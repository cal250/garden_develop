import {
  Polygon,
  PolygonComponentProps,
} from "@/components/atoms/polygon/polygon";
import {
  generateHexagonPoints,
  generateParallelogramPoints,
} from "@/components/atoms/polygon/utils";

const meta = {
  title: "Components/Atoms/Polygon/Polygon",
  component: Polygon,
};

export default meta;

export const Default = {
  args: {
    style: {
      width: "400px",
      height: "400px",
    },
    points: generateHexagonPoints({ height: 100, width: 400 }),
    className: "flex items-center justify-center bg-white",
    stroke: "darkblue",
    strokeWidth: 20,
    children: "Polygon Content",
  },
  render: (args: PolygonComponentProps) => <Polygon {...args} />,
};

export const Specification = {
  args: {
    style: {
      width: "450px",
      height: "200px",
      color: "white",
    },
    points: generateParallelogramPoints({ height: 200, width: 400 }),
    stroke: "rgba(255, 255, 255)",
    strokeWidth: 20,
    children: (
      <div className="flex h-full w-full items-center justify-center bg-red-500 text-center">
        Polygon Content
      </div>
    ),
    className: "bg-blue-500/70 flex items-center justify-center",
  },
  render: (args: PolygonComponentProps) => (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="relative flex flex-row gap-4">
        <div
          className="absolute"
          style={{
            width: 45,
            top: 0,
            left: -50,
            height: 20,
            background: "red",
          }}
        ></div>
        <div className="flex flex-col items-center gap-4">
          <Polygon {...args} overflow={true} />
          <span>With overflow</span>
        </div>
        <div className="flex flex-col items-center gap-4">
          <Polygon {...args} overflow={false} />
          <span>Without overflow</span>
        </div>
      </div>
    </div>
  ),
};

export const BorderColors = {
  args: {
    ...Default.args,
    borderColors: ["red", "blue", "green", "yellow", "purple", "orange"],
  },
};

export const DifferentBorderWidths = {
  args: {
    ...Default.args,
    points: [
      [0, 0],
      [400, 0],
      [350, 100],
      [50, 100],
    ],
    strokeWidth: 20,
    borderWidths: [0, 5, 30, 5],
    children: <span className="text-black">Inner content still works</span>,
  },
};

export const LinearGradientFill = {
  args: {
    ...Default.args,
  },
  render: (args: PolygonComponentProps) => (
    <Polygon {...args} className="bg-gradient-to-b from-[red] to-[blue]" />
  ),
};

export const RadialGradientFill = {
  args: {
    ...Default.args,
  },
  render: (args: PolygonComponentProps) => (
    <Polygon
      {...args}
      style={{
        background: `radial-gradient(circle, red, blue)`,
        ...args.style,
      }}
    />
  ),
};

export const InscribedContent = {
  args: {
    ...Default.args,
    className: "bg-blue-500/70 flex items-center justify-center text-center",
  },
  render: (args: PolygonComponentProps) => (
    <div className="flex gap-4">
      <Polygon {...args} inscribedContent>
        Content is inscribed
      </Polygon>
      <Polygon {...args}>Content is not inscribed</Polygon>
    </div>
  ),
};
