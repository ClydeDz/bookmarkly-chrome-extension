import { NavLink } from "@mantine/core";
import { AppContext } from "../../state/context/AppContext";
import { useContext } from "react";
import { DEFAULT_BOOKMARKS_FOLDER } from "../../const/app";
import { truncateString } from "../../utils/string";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentNodeId } from "../../state/redux/navigationSlice";

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
        />
      );
    });
  };

  if (!bookmarks) return <></>;

  return renderNavItems(bookmarks[0].children);
};
