import { GridOptions } from "ag-grid-community";

export const columnsData = [
  {
    headerName: "Id",
    field: "id",
    sortable: true,
    filter: true,
  },
  {
    headerName: "Full name",
    field: "fullName",
    sortable: true,
    filter: true,
  },
  {
    headerName: "Email",
    field: "email",
    sortable: true,
    filter: true,
  },
  {
    headerName: "Phone",
    field: "phone",
    sortable: true,
    filter: true,
  },
  {
    headerName: "Role",
    field: "role",
    sortable: true,
    filter: true,
  },
  {
    headerName: "Chief",
    field: "chief",
    sortable: true,
    filter: true,
  },
  {
    headerName: "Subordinates",
    field: "subordinateList",
    sortable: true,
    filter: true,
  },
  {
    headerName: "Created at",
    field: "createdAt",
    sortable: true,
    filter: true,
  },
];

export const gridOptions: GridOptions = {
  rowSelection: "multiple",
  pagination: true,
  // TODO add var for pageSize???
  paginationPageSize: 20,
};
