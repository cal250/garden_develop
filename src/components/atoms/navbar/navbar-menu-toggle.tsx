import {
  AriaToggleButtonProps,
  useToggleButton as useAriaToggleButton,
} from "@react-aria/button";
import { HTMLNextUIProps } from "@nextui-org/system";
import { clsx, dataAttr } from "@nextui-org/shared-utils";
import { useToggleState } from "@react-stately/toggle";
import { useFocusRing } from "@react-aria/focus";
import { mergeProps } from "@react-aria/utils";
import { useHover } from "@react-aria/interactions";
import { ReactNode, useMemo } from "react";

import { useNavbarContext } from "./navbar-context";
import { withPolygon } from "@/components/utils/react/polymorphism";
import { NavbarMenuToggleIcon } from "@/components/atoms/navbar/navbar-menu-toggle-icon";

export interface Props
  extends Omit<HTMLNextUIProps<"button">, keyof AriaToggleButtonProps> {
  /**
   * The value of the input element, used when submitting an HTML form. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#htmlattrdefvalue).
   */
  value?: string;
  /**
   * Text to display for screen readers.
   * @default open/close navigation menu
   */
  srOnlyText?: string;
  /**
   * The icon to display.
   */
  icon?: ReactNode | ((isOpen: boolean) => ReactNode) | null;
}

export type NavbarMenuToggleProps = Props & AriaToggleButtonProps;

const NavbarMenuToggle = withPolygon<NavbarMenuToggleProps, "button">(
  (Polygon, props, domRef) => {
    const {
      icon,
      className,
      onChange,
      autoFocus,
      srOnlyText: srOnlyTextProp,
      ...otherProps
    } = props;

    const { slots, classNames, isMenuOpen, setIsMenuOpen } = useNavbarContext();

    const handleChange = (isOpen: boolean) => {
      onChange?.(isOpen);
      setIsMenuOpen(isOpen);
    };

    const state = useToggleState({
      ...otherProps,
      isSelected: isMenuOpen,
      onChange: handleChange,
    });

    const { buttonProps, isPressed } = useAriaToggleButton(
      props,
      state,
      domRef,
    );
    const { isFocusVisible, focusProps } = useFocusRing({ autoFocus });
    const { isHovered, hoverProps } = useHover({});

    const toggleStyles = clsx(classNames?.toggle, className);

    const child = useMemo(() => {
      if (typeof icon === "function") {
        return icon(isMenuOpen ?? false);
      }

      return icon || <NavbarMenuToggleIcon />;
    }, [icon, isMenuOpen, slots.toggleIcon, classNames?.toggleIcon]);

    const srOnlyText = useMemo(() => {
      if (srOnlyTextProp) {
        return srOnlyTextProp;
      }

      return state.isSelected
        ? "close navigation menu"
        : "open navigation menu";
    }, [srOnlyTextProp, isMenuOpen]);

    return (
      <Polygon
        className={slots.toggle?.({ class: toggleStyles })}
        data-focus-visible={dataAttr(isFocusVisible)}
        data-hover={dataAttr(isHovered)}
        data-open={dataAttr(isMenuOpen)}
        data-pressed={dataAttr(isPressed)}
        {...mergeProps(buttonProps, focusProps, hoverProps, otherProps)}
      >
        <span className={slots.srOnly()}>{srOnlyText}</span>
        {child}
      </Polygon>
    );
  },
  "button",
);

NavbarMenuToggle.displayName = "NextUI.NavbarMenuToggle";

export default NavbarMenuToggle;
