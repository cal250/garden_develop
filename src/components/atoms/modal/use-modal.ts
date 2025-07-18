import type {
  ModalSlots,
  ModalVariantProps,
  SlotsToClasses,
} from "@nextui-org/theme";
import { modal } from "@nextui-org/theme";
import type { HTMLMotionProps } from "framer-motion";

import { AriaModalOverlayProps } from "@react-aria/overlays";
import { useAriaModalOverlay } from "@nextui-org/use-aria-modal-overlay";
import {
  ReactNode,
  RefObject,
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  HTMLNextUIProps,
  mapPropsVariants,
  PropGetter,
  useProviderContext,
} from "@nextui-org/system";
import { useAriaButton } from "@nextui-org/use-aria-button";
import { useFocusRing } from "@react-aria/focus";
import { clsx, dataAttr, objectToDeps } from "@nextui-org/shared-utils";
import { ReactRef, useDOMRef } from "@nextui-org/react-utils";
import {
  OverlayTriggerProps,
  useOverlayTriggerState,
} from "@react-stately/overlays";
import { mergeProps, mergeRefs } from "@react-aria/utils";

interface Props extends HTMLNextUIProps<"section"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The props to modify the framer motion animation. Use the `variants` API to create your own animation.
   */
  motionProps?: HTMLMotionProps<"section">;
  /**
   * Determines whether to hide the modal close button.
   * @default false
   */
  hideCloseButton?: boolean;
  /**
   * Custom modal close button element.
   */
  closeButton?: ReactNode;
  /**
   * Whether the animation should be disabled.
   * @default false
   */
  disableAnimation?: boolean;
  /**
   * The container element in which the overlay portal will be placed.
   * @default document.body
   */
  portalContainer?: Element;
  /**
   * Whether the scroll should be blocked when the modal is open.
   * @default true
   */
  shouldBlockScroll?: boolean;
  /**
   *  Callback fired when the modal is closed.
   */
  onClose?: () => void;
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Modal classNames={{
   *    wrapper: "wrapper-classes", // main modal wrapper
   *    backdrop: "backdrop-classes",
   *    base:"base-classes", // modal content wrapper
   *    header: "header-classes", // modal header
   *    body: "body-classes", // modal body
   *    footer: "footer-classes", // modal footer
   *    closeButton: "close-button-classes", // modal close button
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<ModalSlots>;
}

export type UseModalProps = Props &
  OverlayTriggerProps &
  AriaModalOverlayProps &
  ModalVariantProps;

export function useModal(originalProps: UseModalProps) {
  const globalContext = useProviderContext();

  const [props, variantProps] = mapPropsVariants(
    originalProps,
    modal.variantKeys,
  );

  const {
    ref,
    as,
    className,
    classNames,
    isOpen,
    defaultOpen,
    onOpenChange,
    motionProps,
    closeButton,
    isDismissable = true,
    hideCloseButton = false,
    shouldBlockScroll = true,
    portalContainer,
    isKeyboardDismissDisabled = false,
    onClose,
    ...otherProps
  } = props;

  const Component = as || "section";

  const domRef = useDOMRef(ref);
  const closeButtonRef = useRef<HTMLElement>(null);

  const [headerMounted, setHeaderMounted] = useState(false);
  const [bodyMounted, setBodyMounted] = useState(false);

  const disableAnimation =
    originalProps.disableAnimation ?? globalContext?.disableAnimation ?? false;

  const dialogId = useId();
  const headerId = useId();
  const bodyId = useId();

  const state = useOverlayTriggerState({
    isOpen,
    defaultOpen,
    onOpenChange: (isOpen) => {
      onOpenChange?.(isOpen);
      if (!isOpen) {
        onClose?.();
      }
    },
  });

  const { modalProps, underlayProps } = useAriaModalOverlay(
    {
      isDismissable,
      shouldBlockScroll,
      isKeyboardDismissDisabled,
    },
    state,
    domRef,
  );

  const { buttonProps: closeButtonProps } = useAriaButton(
    { onPress: state.close },
    closeButtonRef as RefObject<any>,
  );
  const {
    isFocusVisible: isCloseButtonFocusVisible,
    focusProps: closeButtonFocusProps,
  } = useFocusRing();

  const baseStyles = clsx(classNames?.base, className);

  const slots = useMemo(
    () =>
      modal({
        ...variantProps,
        disableAnimation,
      }),
    [objectToDeps(variantProps), disableAnimation],
  );

  const getDialogProps: PropGetter = (props = {}, ref = null) => ({
    ref: mergeRefs(ref, domRef),
    ...mergeProps(modalProps, otherProps, props),
    className: slots.base({ class: clsx(baseStyles, props.className) }),
    id: dialogId,
    "data-open": dataAttr(state.isOpen),
    "data-dismissable": dataAttr(isDismissable),
    "aria-modal": dataAttr(true),
    "data-placement": originalProps?.placement ?? "right",
    "aria-labelledby": headerMounted ? headerId : undefined,
    "aria-describedby": bodyMounted ? bodyId : undefined,
  });

  const getBackdropProps = useCallback<PropGetter>(
    (props = {}) => ({
      className: slots.backdrop({ class: classNames?.backdrop }),
      onClick: () => state.close(),
      ...underlayProps,
      ...props,
    }),
    [slots, classNames, underlayProps],
  );

  const getCloseButtonProps: PropGetter = () => {
    return {
      role: "button",
      tabIndex: 0,
      "aria-label": "Close",
      "data-focus-visible": dataAttr(isCloseButtonFocusVisible),
      className: slots.closeButton({ class: classNames?.closeButton }),
      ...mergeProps(closeButtonProps, closeButtonFocusProps),
    };
  };

  return {
    Component,
    slots,
    domRef,
    headerId,
    bodyId,
    motionProps,
    classNames,
    isDismissable,
    closeButton,
    hideCloseButton,
    portalContainer,
    shouldBlockScroll,
    backdrop: originalProps.backdrop ?? "opaque",
    isOpen: state.isOpen,
    onClose: state.close,
    disableAnimation,
    setBodyMounted,
    setHeaderMounted,
    getDialogProps,
    getBackdropProps,
    getCloseButtonProps,
  };
}

export type UseModalReturn = ReturnType<typeof useModal>;
