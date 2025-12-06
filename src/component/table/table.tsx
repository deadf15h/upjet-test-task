import {
  AllCommunityModule,
  ColDef,
  ColGroupDef,
  ModuleRegistry,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { createContext, useEffect, useState } from "react";
import { gridOptions } from "../../const/const";
import { TUser } from "../../const/types";
import AddUserForm from "../add-user-form/add-user-form";
import Button from "../button/button";
import ModalWindow from "../modal-window/modal-window";
import { createUserApi, getUsersApi } from "../../api/api";
import ActionCellRenderer from "../action-cell-renderer/action-cell-renderer";
import "./table.sass";

ModuleRegistry.registerModules([AllCommunityModule]);

export const TableContext = createContext({});

const Table = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);

  const getUsers = async () => {
    const res = await getUsersApi();

    if (res) {
      setUsers(res);
    }
  };

  const handleAddUserModalOpen = () => {
    setAddUserModalOpen(true);
  };

  const handleAddUserModalClose = () => {
    setAddUserModalOpen(false);
  };

  const handleAddUser = async (newUser: TUser) => {
    await createUserApi(newUser);

    handleAddUserModalClose();

    getUsers();
  };

  const columnsData = [
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
    {
      headerName: "Actions",
      field: "",
      cellRenderer: ActionCellRenderer,
      cellRendererParams: {
        onSubmit: () => getUsers(),
      },
    },
  ];
  const [columnDefs] = useState<(ColDef | ColGroupDef)[]>(columnsData);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="table">
      <AgGridReact
        rowData={users}
        columnDefs={columnDefs}
        gridOptions={gridOptions}
      />

      <Button onClick={handleAddUserModalOpen}>Add new user</Button>

      <ModalWindow
        isOpen={isAddUserModalOpen}
        onClose={handleAddUserModalClose}
      >
        <AddUserForm onSubmit={handleAddUser} />
      </ModalWindow>
    </div>
  );
};

export default Table;
