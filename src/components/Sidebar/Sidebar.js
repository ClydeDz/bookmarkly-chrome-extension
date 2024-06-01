import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { AddFolder } from "../AddFolder/AddFolder";
import { AddBookmark } from "../AddBookmark/AddBookmark";
import { useSelector } from "react-redux";
import { Drawer } from "@mantine/core";
import { ACTION_TYPE } from "../../const/app";

export const Sidebar = () => {
  const drawerType = useSelector((state) => state.drawer.drawerType);
  const { itemId } = useSelector((state) => state.navigation);
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    drawerType && open();
  }, [drawerType]);

  return (
    <Drawer
      opened={opened}
      onClose={close}
      title={
        drawerType === ACTION_TYPE.ADD_FOLDER
          ? itemId
            ? ACTION_TYPE.EDIT_FOLDER
            : ACTION_TYPE.ADD_FOLDER
          : itemId
          ? ACTION_TYPE.EDIT_BOOKMARK
          : ACTION_TYPE.ADD_BOOKMARK
      }
      position="right"
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
    >
      {drawerType === ACTION_TYPE.ADD_FOLDER && (
        <AddFolder onSuccessCallback={close} />
      )}
      {drawerType === ACTION_TYPE.ADD_BOOKMARK && (
        <AddBookmark onSuccessCallback={close} />
      )}
    </Drawer>
  );
};
