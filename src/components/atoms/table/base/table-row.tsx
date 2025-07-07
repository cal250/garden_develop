import { HTMLNextUIProps } from "@nextui-org/system";
import { Row } from "@react-stately/table";
import { RowProps } from "@react-types/table";

import type { JSX } from 'react'

export type TableRowProps<T = object> = RowProps<T> &
  Omit<HTMLNextUIProps<"tr">, keyof RowProps<T>>;

const TableRow = Row as (props: TableRowProps) => JSX.Element;

export default TableRow;
