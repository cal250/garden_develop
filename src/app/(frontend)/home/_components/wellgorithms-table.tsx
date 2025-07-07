import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@/components/atoms/table'

// const data = Array.from({ length: 20 }, (_, i) => ({
//   id: i,
//   oldSocial: 'Cell Data',
//   newSocial: 'Cell Data',
//   possibilities:
//     'Personal identity evolves as a living landscape of emotions, insights, and growth.',
//   // arrival: 'Cell Data',
// }))

export const WellgorithmsTable: React.FC<WellgorithmsTableProps> = ({ tableData }) => {
  const [data, setData] = useState<any[]>([...tableData])
  const columns = [
    { key: 'oldSocial', title: 'old social' },
    { key: 'newSocial', title: 'new social' },
    { key: 'possibilities', title: 'possibilities' },
    // { key: 'arrival', title: 'arrival' },
  ]
  useEffect(() => {
    setData(tableData)
  }, [tableData])
  return (
    <Table
      aria-label="List of home octagon data"
      hideHeadingSpacer
      classNames={{
        wrapper: 'bg-color-3 p-0 rounded-none',
        th: 'bg-[#E071AC] py-4 text-color-1 text-center rounded-none text-md m-0 border-b border-b-color-1 border-l border-l-color-1 last:border-r-[2px] last:border-r-color-1 first:border-l-[2px]',
        td: 'p-4 text-color-2 text-center border-b border-b-color-1 border-l border-l-color-1 last:border-r-[2px] last:border-r-color-1 first:border-l-[2px] w-1/4',
        thead: '[&>tr]:first:rounded-none',
      }}
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            style={{ borderRadius: 0 }}
            key={column.key}
            className={
              'text-[12px] leading-[14.63px] sm:text-[16px] sm:leading-[20px] md:text-[22px] md:leading-[26.82px] font-bold'
            }
          >
            {column.title}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={data}>
        {(item: any) => (
          <TableRow key={item.id}>
            {(columnKey) => (
              <TableCell
                key={columnKey}
                className={
                  columnKey === 'possibilities'
                    ? 'w-[40%] text-[10px] leading-[14px] sm:text-[13px] sm:leading-[16px] md:text-[16px] md:leading-[22px] font-semibold'
                    : 'text-[11px] leading-[13.41px] sm:text-[14px] sm:leading-[20px] md:text-[20px] md:leading-[24.38px] font-bold'
                }
              >
                {item[columnKey]}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  )
}

interface WellgorithmsTableProps {
  tableData: any[]
}
