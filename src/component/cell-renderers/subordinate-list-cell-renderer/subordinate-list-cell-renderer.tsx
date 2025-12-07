import { useState } from "react";
import { getUserApi } from "../../../api/api";
import { TUser } from "../../../const/types";
import Button from "../../button/button";
import ModalWindow from "../../modal-window/modal-window";
import "./subordinate-list-cell-renderer.sass";

const SubordinateListCellRenderer = (props: any) => {
  const [isSubordinateListModalOpen, setSubordinateListModalOpen] =
    useState(false);
  const [userSubordinateList, setUserSubordinateList] = useState<TUser[]>([]);

  const handleSubordinateListModalOpen = () => {
    setSubordinateListModalOpen(true);
  };

  const handleSubordinateListModalClose = () => {
    setSubordinateListModalOpen(false);
  };

  const getUser = async () => {
    const res = await getUserApi(props.data.id);

    if (res && res[0].subordinateList) {
      const subList = res![0].subordinateList.map((item: string) =>
        JSON.parse(item)
      );
      setUserSubordinateList(subList);
    }
  };

  return (
    <div className="subordinate-list-cell-renderer">
      <Button
        onClick={() => {
          getUser();
          handleSubordinateListModalOpen();
        }}
      >
        View
      </Button>

      <ModalWindow
        isOpen={isSubordinateListModalOpen}
        onClose={handleSubordinateListModalClose}
      >
        <div className="">Subordinate list:</div>
        {userSubordinateList ? (
          <div className="">
            {userSubordinateList.map((sub) => (
              <div className="" key={sub.id}>
                {sub.fullName}
              </div>
            ))}
          </div>
        ) : (
          "empty"
        )}
      </ModalWindow>
    </div>
  );
};

export default SubordinateListCellRenderer;
