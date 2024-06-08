import { NavLink } from "@mantine/core";

import { useContext } from "react";
import {
  DEFAULT_BOOKMARKS_FOLDER,
  RECENT_BOOKMARKS_FOLDER,
  RECENT_BOOKMARKS_NODE_ID,
} from "../../const/app";
import { truncateString } from "../../utils/string";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentNodeId } from "../../state/redux/navigationSlice";
import { BookmarkIcons } from "../BookmarkIcons/BookmarkIcons";
import { AppContext } from "../../context/AppContext";

export const BookmarkLinks = () => {
  const bookmarks = useContext(AppContext);
  const nodeId = useSelector((state) => state.navigation.currentNodeId);
  const dispatch = useDispatch();

  const onMenuItemClick = (nodeId) => {
    dispatch(setCurrentNodeId(nodeId));
  };

  const doesChildrenContainFolders = (item) => {
    if (item.children.length < 1) return false;

    return item.children.some((child) => !child.url);
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
