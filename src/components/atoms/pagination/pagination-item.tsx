import {
  usePaginationItem,
  UsePaginationItemProps,
} from "./use-pagination-item";
import { withPolygon } from "@/components/utils/react/polymorphism";

export interface PaginationItemProps extends UsePaginationItemProps {}

const PaginationItem = withPolygon<PaginationItemProps, "li">(
  (Polygon, props, ref) => {
    const { children, getItemProps } = usePaginationItem({
      ...props,
      ref,
    });

    return <Polygon {...getItemProps()}>{children}</Polygon>;
  },
  "li",
);

PaginationItem.displayName = "NextUI.PaginationItem";

export default PaginationItem;
