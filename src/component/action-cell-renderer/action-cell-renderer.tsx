import { useState } from "react";
import { deleteUserApi } from "../../api/api";
import Button from "../button/button";
import ConfirmationModalWindow from "../confirmation-modal-window/confirmation-modal-window";
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

  const deleteUser = async (userId: string) => {
    await deleteUserApi(userId);
  };

  return (
    <div className="action-cell-renderer">
      <Button onClick={handleEditUserModalOpen}>Edit</Button>

      <Button onClick={handleDeleteUserModalOpen} color="red">
        Delete
      </Button>

      <ConfirmationModalWindow
        isOpen={isEditUserModalOpen}
        title="Are you sure you want to delete user?"
        onConfirm={() => {}}
        onReject={handleEditUserModalClose}
      />

      <ConfirmationModalWindow
        isOpen={isDeleteUserModalOpen}
        title="Are you sure you want to delete user?"
        onConfirm={() => {
          deleteUser(props.data.id);

          // Supabase does not measure user deletion
          setTimeout(() => {
            props.onSubmit();
          }, 500);

          handleDeleteUserModalClose();
        }}
        onReject={handleDeleteUserModalClose}
      />
    </div>
  );
};

export default ActionCellRenderer;
