import { NavLink } from "@mantine/core";

import { useContext, useEffect, useState } from "react";
import {
  ACTION_TYPE,
  DEFAULT_BOOKMARKS_FOLDER,
  DEFAULT_BOOKMARKS_NODE_ID,
  OTHER_BOOKMARKS_FOLDER,
  RECENT_BOOKMARKS_FOLDER,
  RECENT_BOOKMARKS_NODE_ID,
  TOAST_TYPE,
} from "../../const/app";
import { truncateString } from "../../utils/string";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentNodeId, setItemId } from "../../state/redux/navigationSlice";
import { BookmarkIcons } from "../BookmarkIcons/BookmarkIcons";
import { BookmarkEventsContext } from "../../context/BookmarkEventsContext";
import {
  getBookmarksTree, 
  removeRecursiveBookmarkOrFolder,
} from "../../api/bookmarksApi/bookmarksApi";
import { useContextMenu } from "mantine-contextmenu";
import { IconTrash, IconPencil } from "@tabler/icons-react";
import { setDrawerType } from "../../state/redux/drawerSlice";
import { useToast } from "../../hooks/useToast";

export const BookmarkLinks = () => {
  const bookmarkEventsTriggered = useContext(BookmarkEventsContext);
  const { showContextMenu } = useContextMenu();
  const nodeId = useSelector((state) => state.navigation.currentNodeId);
  const dispatch = useDispatch();
  const [bookmarks, setBookmarks] = useState(null);
  const { showToast } = useToast();

  const loadBookmarkData = async () => {
    setBookmarks(await getBookmarksTree());
  };

  useEffect(() => {
    loadBookmarkData();
  }, [bookmarkEventsTriggered]);

  const onMenuItemClick = (nodeId) => {
    dispatch(setCurrentNodeId(nodeId));
  };

  const doesChildrenContainFolders = (item) => {
    if (item.children.length < 1) return false;

    return item.children.some((child) => !child.url);
  };

  const deleteItem = (item) => {
    try {
      removeRecursiveBookmarkOrFolder(item.id);
      dispatch(setCurrentNodeId(DEFAULT_BOOKMARKS_NODE_ID));

      showToast({
        title: "Success",
        message: `Folder has been deleted successfully`,
      });
    } catch {
      showToast({
        title: "Apologies",
        message: `This folder couldn't be deleted at this time`,
        type: TOAST_TYPE.FAILURE,
      });
    }
  };

  const onEditClick = (item) => {
    dispatch(setItemId(item.id));
    if (item.url) {
      dispatch(setDrawerType(ACTION_TYPE.EDIT_BOOKMARK));
    } else {
      dispatch(setDrawerType(ACTION_TYPE.EDIT_FOLDER));
    }
  };

  const renderContextMenu = (menuItem) => {
    const isDefaultFolder =
      menuItem.title === DEFAULT_BOOKMARKS_FOLDER ||
      menuItem.title === OTHER_BOOKMARKS_FOLDER;

    return !isDefaultFolder
      ? showContextMenu([
          {
            key: "edit",
            icon: <IconPencil size={16} />,
            title: `Edit`,
            onClick: () => onEditClick(menuItem),
          },
          {
            key: "delete",
            icon: <IconTrash size={16} />,
            title: `Delete ${menuItem.title}`,
            onClick: () => deleteItem(menuItem),
            color: "red",
          },
        ])
      : undefined;
  };

  const renderNavItems = (menuItem) => {
    if (!Array.isArray(menuItem)) return;

    return menuItem.map((item) => {
      if (!item.children) return;

      if (doesChildrenContainFolders(item)) {
        return (
          <NavLink
            label={truncateString(item.title, 26)}
            href="#"
            key={item.title}
            defaultOpened={item.title === DEFAULT_BOOKMARKS_FOLDER}
            onClick={() => onMenuItemClick(item.id)}
            variant="filled"
            active={item.id === nodeId}
            leftSection={<BookmarkIcons bookmarkLabel={item.title} />}
            onContextMenu={renderContextMenu(item)}
          >
            {renderNavItems(item.children)}
          </NavLink>
        );
      }

      return (
        <NavLink
          label={truncateString(item.title, 26)}
          href="#"
          key={item.title}
          onClick={() => onMenuItemClick(item.id)}
          variant="filled"
          active={item.id === nodeId}
          leftSection={<BookmarkIcons bookmarkLabel={item.title} />}
          onContextMenu={renderContextMenu(item)}
        />
      );
    });
  };

  const renderRecentBookmarksNavItem = () => {
    return (
      <NavLink
        label={truncateString(RECENT_BOOKMARKS_FOLDER, 26)}
        href="#"
        key={RECENT_BOOKMARKS_FOLDER}
        onClick={() => onMenuItemClick(RECENT_BOOKMARKS_NODE_ID)}
        variant="filled"
        active={RECENT_BOOKMARKS_NODE_ID === nodeId}
        leftSection={<BookmarkIcons bookmarkLabel={RECENT_BOOKMARKS_FOLDER} />}
      />
    );
  };

  if (!bookmarks) return <></>;

  return (
    <>
      {renderRecentBookmarksNavItem()}
      {renderNavItems(bookmarks[0].children)}
    </>
  );
};
