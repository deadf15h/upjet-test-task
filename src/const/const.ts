import { GridOptions } from "ag-grid-community";

export const gridOptions: GridOptions = {
  rowSelection: "multiple",
  pagination: true,
  paginationPageSize: 20,
};

export enum EUserRole {
  user = "User",
  admin = "Admin",
  manager = "Manager",
}

export const timeFormat = "HH:mm:ss DD.MM.YYYY";
