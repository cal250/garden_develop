import { Merge } from "@/components/utils/react/polymorphism";
import React, { DOMElement } from "react";
import { ClassNameValue } from "tailwind-merge";

export type Key = string | number;

type DataAttributes = {
  [dataAttr: string]: any;
};

export type DOMAttributes<T = DOMElement<any, any>> = React.AriaAttributes &
  React.DOMAttributes<T> &
  DataAttributes & {
    id?: string;
    role?: React.AriaRole;
    tabIndex?: number;
    style?: React.CSSProperties;
  };

export type PropGetter<P = Record<string, unknown>, R = DOMAttributes<any>> = (
  props?: Merge<DOMAttributes<any>, P>,
  ref?: React.Ref<any>,
) => R & React.RefAttributes<any>;

export type SlotClasses<T extends string = never> = Partial<
  Record<T, ClassNameValue> & {
    base: ClassNameValue;
  }
>;
