import { ReactNode, useMemo } from "react";

import { useMenuItem, UseMenuItemProps } from "./use-menu-item";
import { MenuSelectedIcon } from "./menu-selected-icon";

export interface MenuItemProps<T extends object = object>
  extends Omit<
    UseMenuItemProps<T>,
    "hasDescriptionTextChild" | "hasTitleTextChild"
  > {}

/**
 * @internal
 */
const MenuItem = (props: MenuItemProps) => {
  const {
    Component,
    slots,
    classNames,
    rendered,
    shortcut,
    description,
    isSelectable,
    isSelected,
    isDisabled,
    selectedIcon,
    startContent,
    endContent,
    disableAnimation,
    hideSelectedIcon,
    getItemProps,
    getLabelProps,
    getDescriptionProps,
    getKeyboardShortcutProps,
    getSelectedIconProps,
  } = useMenuItem(props);

  const selectedContent = useMemo<ReactNode | null>(() => {
    const defaultIcon = (
      <MenuSelectedIcon
        disableAnimation={disableAnimation}
        isSelected={isSelected}
      />
    );

    if (typeof selectedIcon === "function") {
      return selectedIcon({ icon: defaultIcon, isSelected, isDisabled });
    }

    if (selectedIcon) return selectedIcon;

    return defaultIcon;
  }, [selectedIcon, isSelected, isDisabled, disableAnimation]);

  return (
    <Component {...getItemProps()}>
      {startContent}
      {description ? (
        <div className={slots.wrapper({ class: classNames?.wrapper })}>
          <span {...getLabelProps()}>{rendered}</span>
          <span {...getDescriptionProps()}>{description}</span>
        </div>
      ) : (
        <span {...getLabelProps()}>{rendered}</span>
      )}
      {shortcut && <kbd {...getKeyboardShortcutProps()}>{shortcut}</kbd>}
      {isSelectable && !hideSelectedIcon && (
        <span {...getSelectedIconProps()}>{selectedContent}</span>
      )}
      {endContent}
    </Component>
  );
};

MenuItem.displayName = "NextUI.MenuItem";

export default MenuItem;
