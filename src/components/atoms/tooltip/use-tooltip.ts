import type { PopoverVariantProps, SlotsToClasses } from "@nextui-org/theme";
import { popover } from "@nextui-org/theme";
import type { AriaTooltipProps } from "@react-types/tooltip";
import type { OverlayTriggerProps } from "@react-types/overlays";
import type { HTMLMotionProps } from "framer-motion";
import type { OverlayOptions } from "@nextui-org/aria-utils";
import {
  getArrowPlacement,
  toReactAriaPlacement,
} from "@nextui-org/aria-utils";

import {
  ReactNode,
  Ref,
  useCallback,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";
import { useTooltipTriggerState } from "@react-stately/tooltip";
import { mergeProps } from "@react-aria/utils";
import {
  useTooltip as useReactAriaTooltip,
  useTooltipTrigger,
} from "@react-aria/tooltip";
import {
  AriaOverlayProps,
  useOverlay,
  useOverlayPosition,
} from "@react-aria/overlays";
import {
  HTMLNextUIProps,
  mapPropsVariants,
  PropGetter,
  useProviderContext,
} from "@nextui-org/system";
import { dataAttr, objectToDeps } from "@nextui-org/shared-utils";
import { createDOMRef, mergeRefs, ReactRef } from "@nextui-org/react-utils";
import { useSafeLayoutEffect } from "@nextui-org/use-safe-layout-effect";
import { twMerge } from "tailwind-merge";

interface Props extends Omit<HTMLNextUIProps, "content"> {
  /**
   * Ref to the DOM node.
   */
  ref?: ReactRef<HTMLElement | null>;
  /**
   * The children to render. Usually a trigger element.
   */
  children?: ReactNode;
  /**
   * The content of the tooltip.
   */
  content?: string | React.ReactNode;
  /**
   * Whether the tooltip should be disabled, independent from the trigger.
   */
  isDisabled?: boolean;
  /**
   * The delay time in ms for the tooltip to show up.
   * @default 100
   */
  delay?: number;
  /**
   * The delay time in ms for the tooltip to hide.
   * @default 500
   */
  closeDelay?: number;
  /**
   * By default, opens for both focus and hover. Can be made to open only for focus.
   */
  trigger?: "focus";
  /**
   * The props to modify the framer motion animation. Use the `variants` API to create your own animation.
   */
  motionProps?: HTMLMotionProps<"div">;
  /**
   * The container element in which the overlay portal will be placed.
   * @default document.body
   */
  portalContainer?: Element;
  /**
   * List of dependencies to update the position of the tooltip.
   * @default []
   */
  updatePositionDeps?: any[];
  /**
   * Classname or List of classes to change the classNames of the element.
   * if `className` is passed, it will be added to the base slot.
   *
   * @example
   * ```ts
   * <Tooltip classNames={{
   *    base:"base-classes",
   *    content: "content-classes",
   *    arrow: "arrow-classes",
   * }} />
   * ```
   */
  classNames?: SlotsToClasses<"base" | "arrow" | "content">;
}

export type UseTooltipProps = Props &
  AriaTooltipProps &
  AriaOverlayProps &
  OverlayTriggerProps &
  OverlayOptions &
  PopoverVariantProps;

export function useTooltip(originalProps: UseTooltipProps) {
  const globalContext = useProviderContext();
  const [props, variantProps] = mapPropsVariants(
    originalProps,
    popover.variantKeys,
  );

  const {
    ref,
    as,
    isOpen: isOpenProp,
    content,
    children,
    defaultOpen,
    onOpenChange,
    isDisabled,
    trigger: triggerAction,
    shouldFlip = true,
    containerPadding = 12,
    placement: placementProp = "top",
    delay = 100,
    closeDelay = 500,
    showArrow = false,
    offset = 7,
    crossOffset = 0,
    isDismissable,
    shouldCloseOnBlur = true,
    portalContainer,
    isKeyboardDismissDisabled = false,
    updatePositionDeps = [],
    shouldCloseOnInteractOutside,
    className,
    onClose,
    motionProps,
    classNames,
    ...otherProps
  } = props;

  const disableAnimation =
    originalProps?.disableAnimation ?? globalContext?.disableAnimation ?? false;

  const state = useTooltipTriggerState({
    delay,
    closeDelay,
    isDisabled,
    defaultOpen,
    isOpen: isOpenProp,
    onOpenChange: (isOpen) => {
      onOpenChange?.(isOpen);
      if (!isOpen) {
        onClose?.();
      }
    },
  });

  const triggerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const tooltipId = useId();

  const isOpen = state.isOpen && !isDisabled;

  // Sync ref with overlayRef from passed ref.
  useImperativeHandle(ref, () =>
    // @ts-ignore
    createDOMRef(overlayRef),
  );

  const { triggerProps, tooltipProps: triggerTooltipProps } = useTooltipTrigger(
    {
      isDisabled,
      trigger: triggerAction,
    },
    state,
    triggerRef,
  );

  const { tooltipProps } = useReactAriaTooltip(
    {
      isOpen,
      ...mergeProps(props, triggerTooltipProps),
    },
    state,
  );

  const {
    overlayProps: positionProps,
    placement,
    updatePosition,
  } = useOverlayPosition({
    isOpen: isOpen,
    targetRef: triggerRef,
    placement: toReactAriaPlacement(placementProp),
    overlayRef,
    offset: showArrow ? offset + 3 : offset,
    crossOffset,
    shouldFlip,
    containerPadding,
  });

  useSafeLayoutEffect(() => {
    if (!updatePositionDeps.length) return;
    // force update position when deps change
    updatePosition();
  }, updatePositionDeps);

  const { overlayProps } = useOverlay(
    {
      isOpen: isOpen,
      onClose: state.close,
      isDismissable,
      shouldCloseOnBlur,
      isKeyboardDismissDisabled,
      shouldCloseOnInteractOutside,
    },
    overlayRef,
  );

  const slots = useMemo(
    () =>
      popover({
        ...variantProps,
        disableAnimation,
        radius: originalProps?.radius ?? "md",
        size: originalProps?.size ?? "md",
        shadow: originalProps?.shadow ?? "sm",
      }),
    [
      objectToDeps(variantProps),
      disableAnimation,
      originalProps?.radius,
      originalProps?.size,
      originalProps?.shadow,
    ],
  );

  const getTriggerProps = useCallback<PropGetter>(
    (props = {}, _ref: Ref<any> | null | undefined = null) => ({
      ...mergeProps(triggerProps, props),
      ref: mergeRefs(_ref, triggerRef),
      "aria-describedby": isOpen ? tooltipId : undefined,
    }),
    [triggerProps, isOpen, tooltipId, state],
  );

  const getTooltipProps = useCallback<PropGetter>(
    () => ({
      ref: overlayRef,
      "data-slot": "base",
      "data-open": dataAttr(isOpen),
      "data-arrow": dataAttr(showArrow),
      "data-disabled": dataAttr(isDisabled),
      "data-placement": getArrowPlacement(placement || "top", placementProp),
      ...mergeProps(tooltipProps, overlayProps),
      style: mergeProps(positionProps.style, otherProps.style, props.style),
      className: slots.base({ class: classNames?.base }),
      id: tooltipId,
    }),
    [
      slots,
      isOpen,
      showArrow,
      isDisabled,
      placement,
      placementProp,
      tooltipProps,
      overlayProps,
      otherProps,
      positionProps,
      props,
      tooltipId,
    ],
  );

  const getTooltipContentProps = useCallback<PropGetter>(
    () => ({
      "data-slot": "content",
      "data-open": dataAttr(isOpen),
      "data-arrow": dataAttr(showArrow),
      "data-disabled": dataAttr(isDisabled),
      "data-placement": getArrowPlacement(placement || "top", placementProp),
      className: slots.content({
        class: twMerge(classNames?.content, className),
      }),
      ...otherProps,
    }),
    [
      slots,
      isOpen,
      showArrow,
      isDisabled,
      placement,
      placementProp,
      otherProps,
      classNames,
    ],
  );

  return {
    content,
    children,
    isOpen,
    triggerRef,
    showArrow,
    portalContainer,
    placement: placementProp,
    disableAnimation,
    isDisabled,
    motionProps,
    getTooltipContentProps,
    getTriggerProps,
    getTooltipProps,
  };
}

export type UseTooltipReturn = ReturnType<typeof useTooltip>;
