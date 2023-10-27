import React from "react";
import format from "date-fns/format";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { trpc } from "@/utils/trpc-hooks";
import { Form } from "@prisma/client";

const AdminDashboard = () => {
  const res = trpc.getAllForms.useQuery();
  const data =
    res.data?.map((d) => ({
      ...d,
      mSWId: d.msw_name.name,
      survey_date: new Date(d.survey_date),
    })) ?? [];

  const columnHelper = createColumnHelper<Form>();
  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("mSWId", {
      header: "MSW Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("survey_date", {
      header: "Survey Date",
      cell: (info) => format(info.getValue(), "dd-MM-yyyy"),
    }),
    columnHelper.accessor("age_group", {
      header: "Age Group",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("gender", {
      header: "Gender",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("race", {
      header: "Race",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("marital_status", {
      header: "Marital Status",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("education_level", {
      header: "Education Level",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("employment_status", {
      header: "Employment Status",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("main_caregiver", {
      header: "Main Caregiver",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("caregiving_length", {
      header: "Caregiving Length",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("mSWId", {
      header: "MSW Name",
      cell: (info) => info.row.getValue,
    }),
    columnHelper.accessor("qn1", {
      header: "Question 1",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("qn2", {
      header: "Question 2",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("qn3", {
      header: "Question 3",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("qn4", {
      header: "Question 4",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("qn5", {
      header: "Question 5",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("qn6", {
      header: "Question 6",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("qn7", {
      header: "Question 7",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("qn8", {
      header: "Question 8",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("qn9", {
      header: "Question 9",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("qn10", {
      header: "Question 10",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("qn11", {
      header: "Question 11",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("qn12", {
      header: "Question 12",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("qn13", {
      header: "Question 13",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("qn14", {
      header: "Question 14",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("qn15", {
      header: "Question 15",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("qn16", {
      header: "Question 16",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("qn17", {
      header: "Question 17",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("qn18", {
      header: "Question 18",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("qn19", {
      header: "Question 19",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("qn20", {
      header: "Question 20",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("qn21", {
      header: "Question 21",
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <>
      <div>AdminDashboard</div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                return (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default AdminDashboard;
