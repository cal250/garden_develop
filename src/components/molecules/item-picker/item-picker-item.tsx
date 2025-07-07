import { ItemProps } from "@/components/utils/react/collections";
import { ReactNode } from "react";
import { AriaOptionProps, PressEvents } from "react-aria";
import { FocusableProps } from "@react-types/shared";
import { Item } from "@react-stately/collections";
import { As, PolymorphicPolygonProps } from "@/components/utils/react/polymorphism";
import { PolygonProps } from "@/components/atoms/polygon/polygon";
import { SlotClasses } from "@/components/utils/react/types";

import type { JSX } from 'react'

export type ItemPickerSelectedIconProps = {
  /**
   * The current icon, usually an checkmark icon.
   */
  icon?: ReactNode;
  /**
   * The current selected status.
   */
  isSelected?: boolean;
  /**
   * The current disabled status.
   * @default false
   */
  isDisabled?: boolean;
};

interface Props<T extends object = {}>
  extends Omit<ItemProps<"li", T>, "children" | "title"> {
  children?: ReactNode | null;

  title?: ReactNode | null;

  startContent?: ReactNode;

  endContent?: ReactNode;

  hideSelectedIcon?: boolean;

  selectedIcon?:
    | ReactNode
    | ((props: ItemPickerSelectedIconProps) => ReactNode)
    | null;

  classNames?: SlotClasses<"selectedIcon" | "title" | "base">;
}

export type ItemPickerItemProps<T extends object = {}> = Props<T> &
  AriaOptionProps &
  FocusableProps &
  PressEvents;

const ItemPickerItem = Item as <
  C extends As,
  P extends PolygonProps,
  T extends object = {},
>(
  props: PolymorphicPolygonProps<C, P, ItemPickerItemProps<T>>,
) => JSX.Element;

export default ItemPickerItem;
