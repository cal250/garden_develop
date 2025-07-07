import { As, PropsOf } from "@/components/utils/react/polymorphism";
import {
  ItemProps as BaseItemProps,
  SectionProps as BaseSectionProps,
} from "@react-types/shared";

export type ItemProps<
  Type extends As = "div",
  T extends object = {},
> = BaseItemProps<T> & PropsOf<Type>;

export type SectionProps<
  Type extends As = "ul",
  T extends object = {},
> = BaseSectionProps<T> & PropsOf<Type>;
