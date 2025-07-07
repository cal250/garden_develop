'use client'

import React from 'react'
import { forwardRef } from '@/components/utils/react/polymorphism'
import { usePolygon, UsePolygonProps } from '@/components/atoms/polygon/hooks/use-polygon'

export interface PolygonProps extends UsePolygonProps {}

export const Polygon = forwardRef<PolygonProps>((props, ref) => {
  const { getBaseProps, border, children, Component } = usePolygon({
    ...props,
    ref,
  })

  return (
    <React.Fragment>
      {border}
      <Component {...getBaseProps()}>{children}</Component>
    </React.Fragment>
  )
})

export type PolygonComponentProps = React.ComponentProps<typeof Polygon>
