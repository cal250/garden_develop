import {
  BaseHouseLayout,
  BaseHouseLayoutProps,
} from '@/components/templates/house-layout/base-house-layout'
import RadialPolygon from '@/components/molecules/radial-polygon/radial-polygon'
import React from 'react'
import { FlowerIcon } from '@/components/atoms/icons'
import Typography from '@/components/atoms/typography/typography'

const meta = {
  title: 'Components/Templates/HouseLayout/Base',
  component: BaseHouseLayout,
}

export default meta

const OctagonComponent = (
  <RadialPolygon
    sides={8}
    coreSize={0.45}
    backgroundColor={'rgb(var(--color-3))'}
    boundary={{
      radii: {
        stroke: 'rgb(var(--color-2))',
        strokeWidth: 4,
      },
      outer: {
        stroke: 'rgb(var(--color-1))',
        strokeWidth: 4,
      },
      inner: {
        stroke: 'rgb(var(--color-2))',
        strokeWidth: 4,
      },
    }}
  />
)

export const Default = {
  args: {
    title: 'Template',
    bracketTitle: 'universal',
    children: (
      <div className="flex h-[300px] items-center justify-center text-white">
        without the octagon, we show top nav background bar
      </div>
    ),
    menuItems: [{ title: 'flowers', isActive: true }, { title: 'shadows' }, { title: 'seasons' }],
    navRightItems: [
      <FlowerIcon className="h-6 w-6" fill="rgb(var(--color-10))" strokeWidth={2} key="icon-1" />,
      <FlowerIcon className="h-6 w-6" fill="rgb(var(--color-10))" strokeWidth={2} key="icon-2" />,
    ],
    navLeftItems: [
      <FlowerIcon className="h-6 w-6" fill="rgb(var(--color-10))" strokeWidth={2} key="icon-1" />,
      <FlowerIcon className="h-6 w-6" fill="rgb(var(--color-10))" strokeWidth={2} key="icon-2" />,
    ],
    navEndItem: <Typography className="text-accent font-bold">welcome, jane</Typography>,
  },
  parameters: {
    layout: 'fullscreen',
  },
  render: (args: BaseHouseLayoutProps) => (
    <div className="h-[1400px]">
      <BaseHouseLayout {...args} />
    </div>
  ),
}

export const WithOctagon = {
  ...Default,
  args: {
    ...Default.args,
    Octagon: OctagonComponent,
    children: (
      <div className="flex h-[300px] items-center justify-center text-white">
        with the octagon, we hide top nav background bar
      </div>
    ),
  },
}
