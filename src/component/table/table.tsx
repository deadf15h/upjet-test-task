import {
  AllCommunityModule,
  ColDef,
  ColGroupDef,
  ModuleRegistry,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";
import { columnsData, gridOptions } from "../../const/const";
import { TUser } from "../../const/types";
import { supabase } from "../../utils/supabase";
import AddUserForm from "../add-user-form/add-user-form";
import Button from "../button/button";
import ModalWindow from "../modal-window/modal-window";
import "./table.sass";

ModuleRegistry.registerModules([AllCommunityModule]);

const Table = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [columnDefs] = useState<(ColDef | ColGroupDef)[]>(columnsData);
  const [isAddUserModalOpen, setAddUserModalOpen] = useState(false);

  const getUsers = async () => {
    let { data, error } = await supabase.from("users").select("*");

    console.log(data);
    if (data && !error) {
      setUsers(data);
    }
  };

  const handleAddUserModalOpen = () => {
    setAddUserModalOpen(true);
  };

  const handleAddUserModalClose = () => {
    setAddUserModalOpen(false);
  };

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
        <AddUserForm />
      </ModalWindow>
    </div>
  );
};

export default Table;
