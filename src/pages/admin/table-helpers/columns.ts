import { createColumnHelper } from "@tanstack/react-table";
import format from "date-fns/format";
import { handleAge } from "./handle-age";
import { handleCapitalise } from "./handle-capitalise";
import { handleMainCaregiver } from "./handle-main-caregiver";
import { handleQuestions } from "./handle-questions";
import { handleCaregivingLength } from "./handle-caregiving-length";
import { TableForm } from "..";

const columnHelper = createColumnHelper<TableForm>();
export const columns = [
  columnHelper.accessor("id", {
    header: "ID",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("msw_name", {
    header: "MSW Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("survey_date", {
    header: "Survey Date",
    cell: (info) => format(info.getValue(), "dd-MM-yyyy"),
  }),
  columnHelper.accessor("age_group", {
    header: "Age Group",
    cell: (info) => handleAge(info.getValue()),
  }),
  columnHelper.accessor("gender", {
    header: "Gender",
    cell: (info) => handleCapitalise(info.getValue()),
  }),
  columnHelper.accessor("race", {
    header: "Race",
    cell: (info) => handleCapitalise(info.getValue()),
  }),
  columnHelper.accessor("marital_status", {
    header: "Marital Status",
    cell: (info) => handleCapitalise(info.getValue()),
  }),
  columnHelper.accessor("education_level", {
    header: "Education Level",
    cell: (info) => handleCapitalise(info.getValue()),
  }),
  columnHelper.accessor("employment_status", {
    header: "Employment Status",
    cell: (info) => handleCapitalise(info.getValue()),
  }),
  columnHelper.accessor("main_caregiver", {
    header: "Main Caregiver",
    cell: (info) => handleMainCaregiver(info.getValue()),
  }),
  columnHelper.accessor("caregiving_length", {
    header: "Caregiving Length",
    cell: (info) => handleCaregivingLength(info.getValue()),
  }),
  columnHelper.accessor("qn1", {
    header: "Question 1",
    cell: (info) => handleQuestions(info.getValue()),
  }),
  columnHelper.accessor("qn2", {
    header: "Question 2",
    cell: (info) => handleQuestions(info.getValue()),
  }),
  columnHelper.accessor("qn3", {
    header: "Question 3",
    cell: (info) => handleQuestions(info.getValue()),
  }),
  columnHelper.accessor("qn4", {
    header: "Question 4",
    cell: (info) => handleQuestions(info.getValue()),
  }),
  columnHelper.accessor("qn5", {
    header: "Question 5",
    cell: (info) => handleQuestions(info.getValue()),
  }),
  columnHelper.accessor("qn6", {
    header: "Question 6",
    cell: (info) => handleQuestions(info.getValue()),
  }),
  columnHelper.accessor("qn7", {
    header: "Question 7",
    cell: (info) => handleQuestions(info.getValue()),
  }),
  columnHelper.accessor("qn8", {
    header: "Question 8",
    cell: (info) => handleQuestions(info.getValue()),
  }),
  columnHelper.accessor("qn9", {
    header: "Question 9",
    cell: (info) => handleQuestions(info.getValue()),
  }),
  columnHelper.accessor("qn10", {
    header: "Question 10",
    cell: (info) => handleQuestions(info.getValue()),
  }),
  columnHelper.accessor("qn11", {
    header: "Question 11",
    cell: (info) => handleQuestions(info.getValue()),
  }),
  columnHelper.accessor("qn12", {
    header: "Question 12",
    cell: (info) => handleQuestions(info.getValue()),
  }),
  columnHelper.accessor("qn13", {
    header: "Question 13",
    cell: (info) => handleQuestions(info.getValue()),
  }),
  columnHelper.accessor("qn14", {
    header: "Question 14",
    cell: (info) => handleQuestions(info.getValue()),
  }),
  columnHelper.accessor("qn15", {
    header: "Question 15",
    cell: (info) => handleQuestions(info.getValue()),
  }),
  columnHelper.accessor("qn16", {
    header: "Question 16",
    cell: (info) => handleQuestions(info.getValue()),
  }),
  columnHelper.accessor("qn17", {
    header: "Question 17",
    cell: (info) => handleQuestions(info.getValue()),
  }),
  columnHelper.accessor("qn18", {
    header: "Question 18",
    cell: (info) => handleQuestions(info.getValue()),
  }),
  columnHelper.accessor("qn19", {
    header: "Question 19",
    cell: (info) => handleQuestions(info.getValue()),
  }),
  columnHelper.accessor("qn20", {
    header: "Question 20",
    cell: (info) => handleQuestions(info.getValue()),
  }),
  columnHelper.accessor("qn21", {
    header: "Question 21",
    cell: (info) => handleQuestions(info.getValue()),
  }),
];
