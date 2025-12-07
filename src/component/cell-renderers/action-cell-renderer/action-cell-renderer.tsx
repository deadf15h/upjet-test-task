import { useState } from "react";
import { deleteUserApi, editUserApi } from "../../../api/api";
import { TUser } from "../../../const/types";
import EditUserForm from "../../add-user-form/edit-user-form";
import Button from "../../button/button";
import ConfirmationModalWindow from "../../confirmation-modal-window/confirmation-modal-window";
import ModalWindow from "../../modal-window/modal-window";
import "./action-cell-renderer.sass";

const ActionCellRenderer = (props: any) => {
  const [isEditUserModalOpen, setEditUserModalOpen] = useState(false);
  const [isDeleteUserModalOpen, setDeleteUserModalOpen] = useState(false);

  const handleEditUserModalOpen = () => {
    setEditUserModalOpen(true);
  };

  const handleEditUserModalClose = () => {
    setEditUserModalOpen(false);
  };

  const handleDeleteUserModalOpen = () => {
    setDeleteUserModalOpen(true);
  };

  const handleDeleteUserModalClose = () => {
    setDeleteUserModalOpen(false);
  };

  const handleDeleteUser = async (userId: string) => {
    await deleteUserApi(userId);
  };

  const handleEditUser = async (userId: string, newUserData: TUser) => {
    await editUserApi(userId, newUserData);

    setTimeout(() => {
      props.onSubmit();
    }, 500);

    handleDeleteUserModalClose();
  };

  return (
    <div className="action-cell-renderer">
      <Button onClick={handleDeleteUserModalOpen} color="red">
        Delete
      </Button>

      <Button onClick={handleEditUserModalOpen}>Edit</Button>

      <ConfirmationModalWindow
        isOpen={isDeleteUserModalOpen}
        title="Are you sure you want to delete user?"
        onConfirm={() => {
          handleDeleteUser(props.data.id);

          // Supabase does not measure user deletion
          setTimeout(() => {
            props.onSubmit();
          }, 500);

          handleDeleteUserModalClose();
        }}
        onReject={handleDeleteUserModalClose}
      />

      <ModalWindow
        isOpen={isEditUserModalOpen}
        onClose={handleEditUserModalClose}
      >
        <EditUserForm onSubmit={handleEditUser} user={props.data} />
      </ModalWindow>
    </div>
  );
};

export default ActionCellRenderer;
