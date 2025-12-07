import { useEffect, useState } from "react";
import { getUserApi } from "../../../api/api";
import Button from "../../button/button";
import ModalWindow from "../../modal-window/modal-window";
import "./subordinate-list-cell-renderer.sass";

const SubordinateListCellRenderer = (props: any) => {
  const [isSubordinateListModalOpen, setSubordinateListModalOpen] =
    useState(false);
  const [userSubordinateList, setUserSubordinateList] = useState<string[]>([]);

  const handleSubordinateListModalOpen = () => {
    setSubordinateListModalOpen(true);
  };

  const handleSubordinateListModalClose = () => {
    setSubordinateListModalOpen(false);
  };

  const getUser = async () => {
    const res = await getUserApi(props.data.id);

    if (res) {
      setUserSubordinateList(res.subordinateList);
    }
  };

  useEffect(() => {
    console.log("userSubordinateList: ", userSubordinateList);
  }, [userSubordinateList]);

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
              <div className="">{sub}</div>
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
