import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons'
import {
  Box,
  chakra,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react'
import { Button } from '@opengovsg/design-system-react'
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table'
import { useState } from 'react'

import { columns } from '@/libs/table-helpers/columns'
import { FormWithUser } from '@/pages/cra-results/[id]'

export type AdminTableProps = {
  data: FormWithUser[]
}

const AdminTable = ({ data }: AdminTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState({})

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
    },
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: false,
    onColumnVisibilityChange: setColumnVisibility,
  })

  return (
    <>
      <Menu closeOnSelect={false}>
        <MenuButton as={Button} mb="5">
          Toggle Columns
        </MenuButton>
        <MenuList minWidth="240px">
          <MenuOptionGroup
            defaultValue={table.getAllLeafColumns().map((column) => column.id)}
            title="Toggle columns"
            type="checkbox"
          >
            {table.getAllLeafColumns().map((column) => {
              return (
                <MenuItemOption
                  key={column.id}
                  value={column.id}
                  onClickCapture={column.getToggleVisibilityHandler()}
                >
                  {column.id}
                </MenuItemOption>
              )
            })}
          </MenuOptionGroup>
        </MenuList>
      </Menu>
      <Box overflowX="scroll">
        <Table size="sm">
          <Thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                  const meta: any = header.column.columnDef.meta
                  return (
                    <Th
                      bg="gray.100"
                      key={header.id}
                      _hover={{ cursor: 'pointer' }}
                      onClick={header.column.getToggleSortingHandler()}
                      isNumeric={meta?.isNumeric}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}

                      <chakra.span pl="4">
                        {header.column.getIsSorted() ? (
                          header.column.getIsSorted() === 'desc' ? (
                            <TriangleDownIcon aria-label="sorted descending" />
                          ) : (
                            <TriangleUpIcon aria-label="sorted ascending" />
                          )
                        ) : null}
                      </chakra.span>
                    </Th>
                  )
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                  const meta: any = cell.column.columnDef.meta
                  return (
                    <Td key={cell.id} isNumeric={meta?.isNumeric}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Td>
                  )
                })}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </>
  )
}

export default AdminTable
