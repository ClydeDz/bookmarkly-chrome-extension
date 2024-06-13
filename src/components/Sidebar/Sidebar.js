import { useDisclosure } from "@mantine/hooks";
import { useEffect } from "react";
import { AddFolder } from "../AddFolder/AddFolder";
import { AddBookmark } from "../AddBookmark/AddBookmark";
import { useDispatch, useSelector } from "react-redux";
import { Drawer } from "@mantine/core";
import { ACTION_TYPE, TOAST_TYPE } from "../../const/app";
import { setDrawerType } from "../../state/redux/drawerSlice";
import { setItemId } from "../../state/redux/navigationSlice";
import { useToast } from "../../hooks/useToast";

export const Sidebar = () => {
  const drawerType = useSelector((state) => state.drawer.drawerType);
  const [opened, { open, close }] = useDisclosure(false);
  const dispatch = useDispatch();
  const { showToast } = useToast();

  useEffect(() => {
    drawerType && open();
  }, [drawerType]);

  const onClose = () => {
    close();
    dispatch(setDrawerType(undefined));
    dispatch(setItemId(undefined));
  };

  const onSuccessClose = () => {
    close();
    showToast({
      title: "Yay!",
      message: `${drawerType} successful`,
      type: TOAST_TYPE.SUCCESS,
    });
    dispatch(setDrawerType(undefined));
    dispatch(setItemId(undefined));
  };

  const onFailureClose = () => {
    close();
    showToast({
      title: "Oops!",
      message: `${drawerType} failed`,
      type: TOAST_TYPE.FAILURE,
    });
    dispatch(setDrawerType(undefined));
    dispatch(setItemId(undefined));
  };

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title={drawerType}
      position="right"
      overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
    >
      {(drawerType === ACTION_TYPE.ADD_FOLDER ||
        drawerType === ACTION_TYPE.EDIT_FOLDER) && (
        <AddFolder
          onSuccessCallback={onSuccessClose}
          onFailureCallback={onFailureClose}
        />
      )}
      {(drawerType === ACTION_TYPE.ADD_BOOKMARK ||
        drawerType === ACTION_TYPE.EDIT_BOOKMARK) && (
        <AddBookmark
          onSuccessCallback={onSuccessClose}
          onFailureCallback={onFailureClose}
        />
      )}
    </Drawer>
  );
};
