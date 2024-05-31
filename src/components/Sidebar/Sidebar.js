import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { AddFolder } from "../AddFolder/AddFolder";
import { AddBookmark } from "../AddBookmark/AddBookmark";
import { useSelector } from "react-redux";
import { Drawer } from "@mantine/core";
import { ACTION_TYPE } from "../../const/app";

export const Sidebar = () => {
  const drawerType = useSelector((state) => state.drawer.drawerType);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    drawerType && open();
  }, [drawerType]);

  const renderInsideComponent = () => {
    if (drawerType === ACTION_TYPE.ADD_FOLDER) {
      return <AddFolder onSuccessCallback={close} />;
    }
    if (drawerType === ACTION_TYPE.ADD_BOOKMARK) {
      return <AddBookmark onSuccessCallback={close} />;
    }
  };

  return (
    <Drawer
      opened={opened}
      onClose={close}
      title={
        drawerType === ACTION_TYPE.ADD_FOLDER
          ? ACTION_TYPE.ADD_FOLDER
          : ACTION_TYPE.ADD_BOOKMARK
      }
      position="right"
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
    >
      {renderInsideComponent()}
    </Drawer>
  );
};
