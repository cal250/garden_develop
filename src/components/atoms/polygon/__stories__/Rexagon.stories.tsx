import { Rexagon, RexagonProps } from '@/components/atoms/polygon/rexagon'
import { RegularPolygon } from '@/components/atoms/polygon/regular-polygon'

const meta = {
  title: 'Components/Atoms/Polygon/Rexagon',
  component: Rexagon,
}

export default meta

export const Default = {
  args: {
    style: {
      width: '400px',
      height: '100px',
    },
    strokeWidth: 4,
  },
  render: (args: RexagonProps) => <Rexagon {...args} />,
}

export const ComparisonWithOctagon = {
  args: {
    style: {
      width: '400px',
      height: '100px',
    },
    strokeWidth: 4,
  },
  render: (args: RexagonProps) => (
    <div className="relative flex flex-col items-center gap-4">
      <div
        className="absolute left-0 top-0 pointer-events-none  z-10 h-[400px] w-[5px] bg-[red]"
        style={{
          top: -15,
          transform: 'rotate(22.5deg) ',
        }}
      ></div>
      <div
        className="absolute z-10 h-[400px] w-[5px] bg-[red]"
        style={{
          left: 0,
          top: 250,
          transform: 'rotate(22.5deg) ',
        }}
      ></div>
      <RegularPolygon
        sides={8}
        style={{
          width: '400px',
          height: '400px',
        }}
      />
      <Rexagon {...args}>Content goes here</Rexagon>
    </div>
  ),
}
