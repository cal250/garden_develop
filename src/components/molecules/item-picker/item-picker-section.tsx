import { SlotClasses } from "@/components/utils/react/types";
import { ItemPickerItemProps } from "@/components/molecules/item-picker/item-picker-item";
import { SectionProps } from "@/components/utils/react/collections";
import { Section } from "@react-stately/collections";
import { As, PolymorphicPolygonProps } from "@/components/utils/react/polymorphism";
import { PolygonProps } from "@/components/atoms/polygon/polygon";
import React from "react";

import type { JSX } from 'react'

export interface ItemPickerSectionProps<T extends object = {}>
  extends SectionProps<"ul", T> {
  /**
   * The item picker section classNames.
   */
  classNames?: SlotClasses<"heading" | "group" | "divider">;
  /**
   * The item picker items classNames.
   */
  itemClasses?: ItemPickerItemProps["classNames"];
  /**
   * Whether to hide the check icon when the items are selected.
   * @default false
   */
  hideSelectedIcon?: boolean;

  /**
   * Styles for the group slot
   */
  groupStyles?: React.CSSProperties;
}
const ItemPickerSection = Section as <
  C extends As,
  P extends PolygonProps,
  T extends object,
>(
  props: PolymorphicPolygonProps<C, P, ItemPickerSectionProps<T>>,
) => JSX.Element;

export default ItemPickerSection;
