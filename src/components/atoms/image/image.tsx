import { cloneElement } from "react";

import { useImage, UseImageProps } from "./use-image";
import { withPolygon } from "@/components/utils/react/polymorphism";

export interface ImageProps extends Omit<UseImageProps, "showSkeleton"> {}

const Image = withPolygon<ImageProps, "img">((_, props, ref, polygon) => {
  const {
    Component,
    domRef,
    slots,
    classNames,
    isBlurred,
    isZoomed,
    removeWrapper,
    getImgProps,
    getWrapperProps,
    getBlurredImgProps,
  } = useImage({
    ...props,
    ref,
  });

  const Wrapper = polygon || "div";

  const img = <Component ref={domRef} {...getImgProps()} />;

  if (removeWrapper) {
    return img;
  }

  const zoomed = (
    <div className={slots.zoomedWrapper({ class: classNames?.zoomedWrapper })}>
      {img}
    </div>
  );

  if (isBlurred) {
    // clone element to add isBlurred prop to the cloned image
    return (
      <Wrapper {...getWrapperProps()}>
        {isZoomed ? zoomed : img}
        {cloneElement(img, getBlurredImgProps())}
      </Wrapper>
    );
  }

  return <Wrapper {...getWrapperProps()}> {isZoomed ? zoomed : img}</Wrapper>;
}, "img");

export default Image;
