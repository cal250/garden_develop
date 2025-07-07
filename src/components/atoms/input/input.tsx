import { useMemo } from "react";

import { useInput, UseInputProps } from "./use-input";
import { CloseFilledIcon } from "@/components/atoms/icons";
import { withPolygon } from "@/components/utils/react/polymorphism";

export interface InputProps extends Omit<UseInputProps, "isMultiline"> {}

const Input = withPolygon<InputProps, "input">((Polygon, props, ref) => {
  const {
    label,
    description,
    isClearable,
    startContent,
    endContent,
    labelPlacement,
    hasHelper,
    isOutsideLeft,
    shouldLabelBeOutside,
    errorMessage,
    isInvalid,
    getBaseProps,
    getLabelProps,
    getInputProps,
    getInnerWrapperProps,
    getInputWrapperProps,
    getMainWrapperProps,
    getHelperWrapperProps,
    getDescriptionProps,
    getErrorMessageProps,
    getClearButtonProps,
  } = useInput({ ...props, ref });

  const labelContent = label ? (
    <label {...getLabelProps()}>{label}</label>
  ) : null;

  const end = useMemo(() => {
    if (isClearable) {
      return (
        <button {...getClearButtonProps()}>
          {endContent || <CloseFilledIcon />}
        </button>
      );
    }

    return endContent;
  }, [isClearable, getClearButtonProps]);

  const helperWrapper = useMemo(() => {
    const shouldShowError = isInvalid && errorMessage;
    const hasContent = shouldShowError || description;

    if (!hasHelper || !hasContent) return null;

    return (
      <div {...getHelperWrapperProps()}>
        {shouldShowError ? (
          <div {...getErrorMessageProps()}>{errorMessage}</div>
        ) : (
          <div {...getDescriptionProps()}>{description}</div>
        )}
      </div>
    );
  }, [
    hasHelper,
    isInvalid,
    errorMessage,
    description,
    getHelperWrapperProps,
    getErrorMessageProps,
    getDescriptionProps,
  ]);

  const innerWrapper = useMemo(() => {
    return (
      <div {...getInnerWrapperProps()}>
        {startContent}
        <input {...getInputProps()} />
        {end}
      </div>
    );
  }, [startContent, end, getInputProps, getInnerWrapperProps]);

  const mainWrapper = useMemo(() => {
    if (shouldLabelBeOutside) {
      return (
        <div {...getMainWrapperProps()}>
          <Polygon {...getInputWrapperProps()}>
            {!isOutsideLeft ? labelContent : null}
            {innerWrapper}
          </Polygon>
          {helperWrapper}
        </div>
      );
    }

    return (
      <>
        <Polygon {...getInputWrapperProps()}>
          {labelContent}
          {innerWrapper}
        </Polygon>
        {helperWrapper}
      </>
    );
  }, [
    labelPlacement,
    helperWrapper,
    shouldLabelBeOutside,
    labelContent,
    innerWrapper,
    errorMessage,
    description,
    getMainWrapperProps,
    getInputWrapperProps,
    getErrorMessageProps,
    getDescriptionProps,
  ]);

  return (
    <div {...getBaseProps()}>
      {isOutsideLeft ? labelContent : null}
      {mainWrapper}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
