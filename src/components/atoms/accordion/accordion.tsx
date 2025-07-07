import { LayoutGroup } from "framer-motion";
import React, { Fragment, Key, useCallback, useMemo } from "react";

import { useAccordion, UseAccordionProps } from "./use-accordion";
import AccordionItem from "./accordion-item";
import { withPolygon } from "@/components/utils/react/polymorphism";
import { Divider } from "@/components/atoms/divider";

export interface AccordionProps extends UseAccordionProps {}

const AccordionGroup = withPolygon<AccordionProps>((Polygon, props, ref) => {
  const {
    values,
    state,
    isSplitted,
    showDivider,
    getBaseProps,
    disableAnimation,
    handleFocusChanged: handleFocusChangedProps,
    itemClasses,
    dividerProps,
  } = useAccordion({
    ...props,
    ref,
  });
  const handleFocusChanged = useCallback(
    (isFocused: boolean, key: Key) => handleFocusChangedProps(isFocused, key),
    [handleFocusChangedProps],
  );

  const content = useMemo(() => {
    return [...state.collection].map((item, index) => {
      const classNames = { ...itemClasses, ...(item.props.classNames || {}) };

      return (
        <Fragment key={item.key}>
          <AccordionItem
            item={item}
            variant={props.variant}
            onFocusChange={handleFocusChanged}
            {...values}
            {...item.props}
            classNames={classNames}
          />
          {!item.props.hidden &&
            !isSplitted &&
            showDivider &&
            index < state.collection.size - 1 && (
              <Divider {...(dividerProps as any)} />
            )}
        </Fragment>
      );
    });
  }, [
    values,
    itemClasses,
    handleFocusChanged,
    isSplitted,
    showDivider,
    state.collection,
  ]);

  return (
    <Polygon {...getBaseProps()}>
      {disableAnimation ? content : <LayoutGroup>{content}</LayoutGroup>}
    </Polygon>
  );
});

AccordionGroup.displayName = "NextUI.Accordion";

export default AccordionGroup;
