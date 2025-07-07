import { RegularHexagon, RegularHexagonProps } from '@/components/atoms/polygon/regular-hexagon'

const meta = {
  title: 'Components/Atoms/Polygon/RegularHexagon',
  component: RegularHexagon,
}

export default meta

export const Default = {
  args: {
    style: {
      width: '400px',
    },
    strokeWidth: 4,
  },
  render: (args: RegularHexagonProps) => <RegularHexagon {...args} />,
}
