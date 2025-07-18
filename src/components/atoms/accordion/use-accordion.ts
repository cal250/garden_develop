import type { MultipleSelection, SelectionBehavior } from '@react-types/shared'
import type { AriaAccordionProps } from '@react-types/accordion'
import type { AccordionGroupVariantProps } from '@nextui-org/theme'
import { accordion } from '@nextui-org/theme'
import type { HTMLNextUIProps, PropGetter } from '@nextui-org/system'
import { useProviderContext } from '@nextui-org/system'
import { filterDOMProps, ReactRef, useDOMRef } from '@nextui-org/react-utils'
import React, { Key, PropsWithChildren, useCallback, useMemo, useState } from 'react'
import { TreeState, useTreeState } from '@react-stately/tree'
import { mergeProps } from '@react-aria/utils'
import { useReactAriaAccordion } from '@nextui-org/use-aria-accordion'

import { AccordionItemProps } from './accordion-item'
import { DividerProps } from '@/components/atoms/divider'

interface Props extends HTMLNextUIProps<'div'> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLDivElement | null>
  /**
   * Whether to display a divider at the bottom of the each accordion item.
   *
   * @default true
   */
  showDivider?: boolean
  /**
   * The divider props.
   */
  dividerProps?: Partial<DividerProps>
  /**
   * The accordion selection behavior.
   * @default "toggle"
   */
  selectionBehavior?: SelectionBehavior
  /**
   * Whether to keep the accordion content mounted when collapsed.
   * @default false
   */
  keepContentMounted?: boolean
  /**
   * The accordion items classNames.
   */
  itemClasses?: AccordionItemProps['classNames']
}

export type UseAccordionProps<T extends object = {}> = Props &
  AccordionGroupVariantProps &
  Pick<
    AccordionItemProps,
    | 'isCompact'
    | 'isDisabled'
    | 'hideIndicator'
    | 'disableAnimation'
    | 'disableIndicatorAnimation'
    | 'motionProps'
  > &
  AriaAccordionProps<T> &
  MultipleSelection

export type ValuesType<T extends object = {}> = {
  state: TreeState<T>
  focusedKey?: Key | null
  isCompact?: AccordionItemProps['isCompact']
  isDisabled?: AccordionItemProps['isDisabled']
  hideIndicator?: AccordionItemProps['hideIndicator']
  disableAnimation?: AccordionItemProps['disableAnimation']
  keepContentMounted?: Props['keepContentMounted']
  disableIndicatorAnimation?: AccordionItemProps['disableAnimation']
  motionProps?: AccordionItemProps['motionProps']
}

export function useAccordion<T extends object>(props: UseAccordionProps<T>) {
  const globalContext = useProviderContext()

  const {
    ref,
    as,
    className,
    items,
    variant,
    motionProps,
    expandedKeys,
    disabledKeys,
    selectedKeys,
    children: childrenProp,
    defaultExpandedKeys,
    selectionMode = 'single',
    selectionBehavior = 'toggle',
    keepContentMounted = false,
    disallowEmptySelection,
    defaultSelectedKeys,
    onExpandedChange,
    onSelectionChange,
    dividerProps = {},
    isCompact = false,
    isDisabled = false,
    showDivider = true,
    hideIndicator = false,
    disableAnimation = globalContext?.disableAnimation ?? false,
    disableIndicatorAnimation = false,
    itemClasses,
    ...otherProps
  } = props

  const [focusedKey, setFocusedKey] = useState<Key | null>(null)

  const domRef = useDOMRef(ref)

  const classNames = useMemo(
    () =>
      accordion({
        variant,
        className,
      }),
    [variant, className],
  )

  // TODO: Remove this once the issue is fixed.
  const children = useMemo(() => {
    // eslint-disable-next-line prefer-const
    let treeChildren: any = []

    /**
     * This is a workaround for rendering ReactNode children in the AccordionItem.
     * @see https://github.com/adobe/react-spectrum/issues/3882
     */
    React.Children.map(childrenProp, (child) => {
      if (
        React.isValidElement(child) &&
        typeof (child.props as PropsWithChildren)?.children !== 'string'
      ) {
        const clonedChild = React.cloneElement(child, {
          // @ts-ignore
          hasChildItems: false,
        })

        treeChildren.push(clonedChild)
      } else {
        treeChildren.push(child)
      }
    })

    return treeChildren
  }, [childrenProp])

  const commonProps = {
    children,
    items,
  }

  const expandableProps = {
    expandedKeys,
    defaultExpandedKeys,
    onExpandedChange,
  }

  const treeProps = {
    disabledKeys,
    selectedKeys,
    selectionMode,
    selectionBehavior,
    disallowEmptySelection,
    defaultSelectedKeys: defaultSelectedKeys ?? defaultExpandedKeys,
    onSelectionChange,
    ...commonProps,
    ...expandableProps,
  }

  const state = useTreeState(treeProps)

  state.selectionManager.setFocusedKey = (key: Key | null) => {
    setFocusedKey(key)
  }

  const { accordionProps } = useReactAriaAccordion(
    {
      ...commonProps,
      ...expandableProps,
    },
    state,
    domRef,
  )

  const values: ValuesType<T> = useMemo(
    () => ({
      state,
      focusedKey,
      motionProps,
      isCompact,
      isDisabled,
      hideIndicator,
      disableAnimation,
      keepContentMounted,
      disableIndicatorAnimation,
    }),
    [
      focusedKey,
      isCompact,
      isDisabled,
      hideIndicator,
      selectedKeys,
      disableAnimation,
      keepContentMounted,
      state?.expandedKeys.values,
      disableIndicatorAnimation,
      state.expandedKeys.size,
      state.disabledKeys.size,
      motionProps,
    ],
  )

  const getBaseProps: PropGetter = useCallback((props = {}) => {
    return {
      ref: domRef,
      className: classNames,
      'data-orientation': 'vertical',
      ...mergeProps(accordionProps, filterDOMProps(otherProps), props),
    }
  }, [])

  const handleFocusChanged = useCallback((isFocused: boolean, key: Key | null) => {
    if (isFocused) setFocusedKey(key)
  }, [])

  return {
    values,
    state,
    focusedKey,
    getBaseProps,
    isSplitted: variant === 'splitted',
    classNames,
    showDivider,
    dividerProps,
    disableAnimation,
    handleFocusChanged,
    itemClasses,
  }
}

export type UseAccordionReturn = ReturnType<typeof useAccordion>
