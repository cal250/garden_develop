import React, { ForwardRefRenderFunction, useMemo } from 'react'
import { ClassNameValue, twMerge } from 'tailwind-merge'
import { PolygonProps } from '@/components/atoms/polygon/polygon'
import { useDOMRef } from '@/components/utils/react/dom'
import { ValidationMap } from 'prop-types'

export type As = React.ElementType

export type Merge<M, N> = N extends Record<string, unknown> ? M : Omit<M, keyof N> & N

export type RightJoinProps<
  SourceProps extends object = {},
  OverrideProps extends object = {},
> = Omit<SourceProps, keyof OverrideProps> & OverrideProps

export type PropsOf<T extends As> = React.ComponentPropsWithoutRef<T> & {
  as?: As
}

export type PolymorphicProps<
  Component extends As,
  Props extends object,
  PolygonProps extends object = {},
> = RightJoinProps<
  PropsOf<Component>,
  RightJoinProps<
    Props & {
      as: As
    },
    PolygonProps
  >
>

export type T = ForwardRefRenderFunction<any>

export type MergeWithAs<
  ComponentProps extends object,
  AsProps extends object,
  AdditionalProps extends object = {},
  AsComponent extends As = As,
> = RightJoinProps<RightJoinProps<ComponentProps, AsProps>, AdditionalProps> & {
  as?: AsComponent
  ref?: React.Ref<any>
}

export type PolymorphicPolygonProps<
  Component extends As,
  PolygonProps extends object,
  Props extends object = {},
> = RightJoinProps<
  RightJoinProps<
    React.ComponentPropsWithoutRef<Component>,
    RightJoinProps<Partial<PolygonProps>, Props>
  >,
  {
    as?: Component
    /**
     * The polygon component to use to shape the component
     */
    polygon?: React.ComponentType<PolygonProps>
  }
>

export type InternalPolymorphicForwardRefRenderFunction<
  Component extends As,
  Props extends object = {},
  PolygonProps extends object = {},
> = {
  <AsComponent extends As = Component, AsPolygonProps extends PolygonProps = PolygonProps>(
    props: PolymorphicPolygonProps<AsComponent, AsPolygonProps, Props>,
  ): React.ReactElement | null
  readonly $$typeof: symbol
  defaultProps?: Partial<Props> | undefined
  // propTypes?: React.WeakValidationMap<Props> | undefined;
  propTypes?: ValidationMap<Props> | undefined
  displayName?: string | undefined
}

export type InternalForwardRefRenderFunction<Component extends As, Props extends object = {}> = {
  <AsComponent extends As = Component>(
    props: MergeWithAs<
      React.ComponentPropsWithoutRef<Component>,
      React.ComponentPropsWithoutRef<AsComponent>,
      Props,
      AsComponent
    >,
  ): React.ReactElement | null
  readonly $$typeof: symbol
  defaultProps?: Partial<Props> | undefined
  // propTypes?: React.WeakValidationMap<Props> | undefined
  propTypes?: ValidationMap<Props> | undefined
  displayName?: string | undefined
}

const createMorphedComponent = <Component extends As, PolygonProps extends object>(
  component: Component,
  defaultAs: As,
  ref: React.Ref<any>,
  Polygon?: React.ComponentType<PolygonProps>,
  className: string = '',
) => {
  // eslint-disable-next-line react/display-name
  return ({ className: defaultClassName, as = component, ...props }: any) => {
    const DefaultAs = defaultAs
    const Component = useMemo(() => {
      return Polygon || (as ? (typeof defaultAs === 'string' ? as : defaultAs) : defaultAs)
    }, [])

    return (
      <Component
        ref={ref}
        {...props}
        className={twMerge(defaultClassName, className)}
        as={
          // Ensure the as prop is passed to the defaultAs component
          Polygon
            ? typeof defaultAs === 'string'
              ? as || defaultAs
              : forwardRef((props: any, ref) => <DefaultAs {...props} as={as} ref={ref} />)
            : undefined
        }
      >
        {props.children}
      </Component>
    )
  }
}

type MorphedPolygonProps<Component extends As, Props extends object> = RightJoinProps<
  PropsOf<Component>,
  RightJoinProps<
    Omit<Partial<Props & PolygonProps>, keyof PropsOf<Component>>,
    {
      className?: ClassNameValue
    }
  >
>

export type MorphedPolygon<
  Component extends As = As,
  PolygonProps extends object = {},
> = React.ComponentType<MorphedPolygonProps<Component, PolygonProps>>

export interface PolymorphicForwardRefFunction {
  <Props extends object, Component extends As = 'div', PolygonProps extends object = {}>(
    component: (
      PolygonComponent: MorphedPolygon<Component, PolygonProps>,
      props: PolymorphicProps<Component, Props, PolygonProps>,
      ref: React.MutableRefObject<any>,
      polygon?: React.ComponentType<any>,
    ) => React.ReactNode,
    defaultAs?: Component,
    defaultPolygon?: React.ComponentType<any>,
  ): InternalPolymorphicForwardRefRenderFunction<Component, Props, PolygonProps>
}

export const withPolygon: PolymorphicForwardRefFunction = (
  component: any,
  defaultAs: As = 'div',
  defaultPolygon?: React.ComponentType<any>,
) => {
  // eslint-disable-next-line react/display-name
  return React.forwardRef(({ as, polygon, className, ...props }: any, ref: any) => {
    const domRef = useDOMRef(ref)

    const Polygon = useMemo(() => {
      return createMorphedComponent(as, defaultAs, domRef, polygon || defaultPolygon, className)
    }, [as, polygon, className, domRef])

    return component(
      Polygon,
      { ...props, as: as || defaultAs, className },
      domRef,
      polygon || defaultPolygon,
    )
  }) as any
}

export function forwardRef<Props extends object, Component extends As = 'div'>(
  component: React.ForwardRefRenderFunction<
    any,
    RightJoinProps<PropsOf<Component>, Props> & {
      as: As
    }
  >,
  defaultAs: Component = 'div' as Component,
) {
  // eslint-disable-next-line react/display-name
  return React.forwardRef(({ as = defaultAs, ...props }: any, ref) => {
    return component({ ...props, as }, ref)
  }) as InternalForwardRefRenderFunction<Component, Props>
}
