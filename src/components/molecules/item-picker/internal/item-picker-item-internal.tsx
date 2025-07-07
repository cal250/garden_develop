import React, { ReactNode, useMemo } from "react";
import { ItemPickerItemProps } from "@/components/molecules/item-picker/item-picker-item";
import { ListState } from "@react-stately/list";
import { withPolygon } from "@/components/utils/react/polymorphism";
import { Node } from "@react-types/shared";
import {
  mergeProps,
  useFocusRing,
  useHover,
  useOption,
  usePress,
} from "react-aria";
import { dataAttr } from "@/components/utils/assertion";
import { ItemPickerSelectedIcon } from "@/components/molecules/item-picker/item-picker-selected-icon";
import { twMerge } from "tailwind-merge";

interface Props<T extends object = object> extends ItemPickerItemProps<T> {
  item: Node<T>;
  state: ListState<T>;
}

export const ItemPickerItemInternal = withPolygon<Props, "li">(
  (Polygon, props, ref) => {
    const {
      item,
      state,
      onPress,
      autoFocus,
      onClick,
      selectedIcon,
      hideSelectedIcon = false,
      startContent,
      endContent,
      classNames,
      ...otherProps
    } = props;

    const { rendered, key } = item;
    const isDisabled = state.disabledKeys.has(key) || props.isDisabled;
    const isSelectable = state.selectionManager.selectionMode !== "none";

    const { pressProps, isPressed } = usePress({
      ref,
      isDisabled,
      onPress,
    });

    const { isHovered, hoverProps } = useHover({ isDisabled });

    const { isFocusVisible, focusProps } = useFocusRing({ autoFocus });

    const {
      isFocused,
      isSelected,
      optionProps: itemProps,
      labelProps,
    } = useOption(
      {
        key,
        isDisabled,
        "aria-label": props["aria-label"],
      },
      state,
      ref,
    );

    const isHighlighted = isFocused || isHovered || isPressed;

    const selectedContent = useMemo<ReactNode | null>(() => {
      const defaultIcon = <ItemPickerSelectedIcon isSelected={isSelected} />;

      if (typeof selectedIcon === "function") {
        return selectedIcon({ icon: defaultIcon, isSelected, isDisabled });
      }

      if (selectedIcon) return selectedIcon;

      return defaultIcon;
    }, [selectedIcon, isSelected, isDisabled]);

    return (
      <Polygon
        {...(mergeProps(
          { onClick },
          itemProps,
          focusProps,
          pressProps,
          hoverProps,
          otherProps,
        ) as any)}
        data-selectable={dataAttr(isSelectable)}
        data-disabled={dataAttr(isDisabled)}
        data-selected={dataAttr(isSelected)}
        data-pressed={dataAttr(isPressed)}
        data-focused={dataAttr(isFocused)}
        data-hover={dataAttr(isHighlighted)}
        data-focus-visible={dataAttr(isFocusVisible)}
        className={twMerge(
          "relative box-border flex cursor-pointer items-center justify-between gap-2 px-2 py-1.5",
          classNames?.base,
        )}
      >
        {startContent}
        <span {...labelProps}>{rendered}</span>
        {isSelectable && !hideSelectedIcon && (
          <span
            aria-hidden={dataAttr(true)}
            data-disabled={dataAttr(isDisabled)}
            className={twMerge(
              "h-3 w-3 flex-shrink-0",
              classNames?.selectedIcon,
            )}
          >
            {selectedContent}
          </span>
        )}
        {endContent}
      </Polygon>
    );
  },
  "li",
);
