'use client'

import React, { PropsWithChildren, useContext, useMemo } from 'react'
import { useResponsiveValue } from '@/hooks/use-responsive-value'
import { compact } from '@/components/atoms/polygon/utils'

interface DesignContext {
  /**
   * The stroke color of the polygons.
   */
  stroke: string

  /**
   * The stroke width of the polygons.
   */
  strokeWidth: number

  /**
   * The angle of the design in degrees.
   */
  designAngle: number
}

const Context = React.createContext<DesignContext | undefined>(undefined)

export function useDesignContext(overrides: Partial<DesignContext> = {}): DesignContext {
  const style = useContext(Context)

  const designAngle = useResponsiveValue({ base: 0, sm: 37 })

  const defaultStyle = useMemo(() => {
    return { designAngle, stroke: 'rgb(var(--color-5))', strokeWidth: 3 }
  }, [designAngle])

  return {
    ...defaultStyle,
    ...compact(style),
    ...compact(overrides),
  } as DesignContext
}

export const DesignContextProvider: React.FC<PropsWithChildren<DesignContextProviderProps>> = (
  props,
) => {
  const previousStyle = useContext(Context)

  return (
    <Context.Provider value={{ ...previousStyle, ...compact(props) } as DesignContext}>
      {props.children}
    </Context.Provider>
  )
}

interface DesignContextProviderProps extends Partial<DesignContext> {}
