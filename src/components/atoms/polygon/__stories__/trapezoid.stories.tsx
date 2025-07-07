import { Trapezoid } from '@/components/atoms/polygon/trapezoid'

const meta = {
  title: 'Components/Atoms/Polygon/Trapezoid',
  component: Trapezoid,
}

export default meta

export const Default = {
  args: {
    style: {
      width: '600px',
      height: '400px',
    },
    strokeWidth: 4,
  },
}

export const Inverted = {
  args: {
    ...Default.args,
    inverted: true,
  },
}

export const RightSlopeOnly = {
  args: {
    ...Default.args,
    slopeAngle: { right: 45 },
  },
}

export const LeftSlopeOnly = {
  args: {
    ...Default.args,
    slopeAngle: { left: 45 },
  },
}

export const BothSidesSloped = {
  args: {
    ...Default.args,
    slopeAngle: { left: 45, right: 20 },
  },
}
