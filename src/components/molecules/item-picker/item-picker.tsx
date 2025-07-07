import React from 'react'
import { AriaListBoxProps, useListBox } from 'react-aria'
import {
  As,
  MorphedPolygon,
  PolymorphicPolygonProps,
  PolymorphicProps,
  withPolygon,
} from '@/components/utils/react/polymorphism'
import { ReactRef } from '@/components/utils/react/dom'
import { ListState, useListState } from '@react-stately/list'
import { ItemPickerItemInternal } from '@/components/molecules/item-picker/internal/item-picker-item-internal'
import { PolygonProps } from '@/components/atoms/polygon/polygon'
import { ItemPickerSectionInternal } from '@/components/molecules/item-picker/internal/item-picker-section-internal'
import { ItemPickerItemProps } from '@/components/molecules/item-picker/item-picker-item'

import type { JSX } from 'react'

interface Props<T extends object> extends AriaListBoxProps<T> {
  ref?: ReactRef<HTMLElement | null>

  state?: ListState<T>

  itemClasses?: ItemPickerItemProps['classNames']
}

const ItemPicker = <T extends object, Component extends As>(
  Polygon: MorphedPolygon<Component>,
  originalProps: PolymorphicProps<Component, Props<T>>,
  domRef: React.RefObject<any>,
) => {
  const {
    state: propState,
    onAction,
    children,
    onSelectionChange,
    selectedKeys,
    itemClasses,
    ...otherProps
  } = originalProps

  const innerState = useListState({
    ...originalProps,
    children,
    onSelectionChange,
  })
  const state = propState || innerState

  const { listBoxProps } = useListBox({ ...originalProps, onAction }, state, domRef)

  return (
    <Polygon {...otherProps} {...(listBoxProps as any)}>
      {[...state.collection].map((item) => {
        const itemProps = {
          item,
          state,
          ...item.props,
        }

        if (item.type === 'section') {
          return (
            <ItemPickerSectionInternal key={item.key} itemClasses={itemClasses} {...itemProps} />
          )
        }

        let itemPickerItem = <ItemPickerItemInternal {...itemProps} key={item.key} />

        if (item.wrapper) {
          itemPickerItem = item.wrapper(itemPickerItem)
        }

        return itemPickerItem
      })}
    </Polygon>
  )
}

export default withPolygon(ItemPicker, 'ul') as <
  T extends object,
  Component extends As,
  Polygon extends PolygonProps,
>(
  props: PolymorphicPolygonProps<Component, Polygon, Props<T>>,
) => JSX.Element

export type ItemPickerProps<
  T extends object = object,
  Component extends As = 'ul',
  Polygon extends PolygonProps = PolygonProps,
> = PolymorphicPolygonProps<Component, Polygon, Props<T>>
