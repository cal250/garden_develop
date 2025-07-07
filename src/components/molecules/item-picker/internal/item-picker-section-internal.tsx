import React from "react";
import { ItemPickerSectionProps } from "@/components/molecules/item-picker/item-picker-section";
import { ListState } from "@react-stately/list";
import { Node } from "@react-types/shared";
import { withPolygon } from "@/components/utils/react/polymorphism";
import { mergeProps, useListBoxSection } from "react-aria";
import { twMerge } from "tailwind-merge";
import { dataAttr } from "@/components/utils/assertion";
import { ItemPickerItemInternal } from "@/components/molecules/item-picker/internal/item-picker-item-internal";

interface Props<T extends object = object> extends ItemPickerSectionProps {
  item: Node<T>;
  state: ListState<T>;
}

export const ItemPickerSectionInternal = withPolygon<Props, "li">(
  (Polygon, originalProps) => {
    const {
      item,
      state,
      classNames,
      hideSelectedIcon,
      groupStyles,
      itemClasses,
      title: _,
      ...otherProps
    } = originalProps;

    const { itemProps, headingProps, groupProps } = useListBoxSection({
      heading: item.rendered,
      "aria-label": item["aria-label"],
    });

    return (
      <Polygon
        key={item.key}
        data-slot="base"
        {...(mergeProps(itemProps, otherProps) as any)}
      >
        {item.rendered && (
          <span
            {...headingProps}
            className={twMerge(classNames?.heading)}
            data-slot="heading"
          >
            {item.rendered}
          </span>
        )}
        <ul
          {...groupProps}
          className={twMerge(classNames?.group)}
          style={groupStyles}
          data-has-title={dataAttr(!!item.rendered)}
          data-slot="group"
        >
          {[...item.childNodes].map((node) => {
            const { key: nodeKey, props: nodeProps } = node;

            let listboxItem = (
              <ItemPickerItemInternal
                key={nodeKey}
                classNames={itemClasses}
                hideSelectedIcon={hideSelectedIcon}
                item={node}
                state={state}
                {...nodeProps}
              />
            );

            if (node.wrapper) {
              listboxItem = node.wrapper(listboxItem);
            }

            return listboxItem;
          })}
        </ul>
      </Polygon>
    );
  },
  "li",
);
